import React, { useEffect, useMemo, useRef, useState } from "react";

import { Box } from "@mui/material";
import { edge, node, vec2 } from "../../helpers/typestuff.ts";
import axios, { AxiosResponse } from "axios";
import { graphHelper, pointHelper } from "../../helpers/clickCorrectionMath.ts";
import MapControls from "./MapControls.tsx";
import InformationMenu from "../InformationMenu.tsx";
import {MAPS, ZOOM, clamp, FLOOR_NAME_TO_INDEX, getMapData, MAP_BASE} from "./MapHelper.ts";


const NODE_SIZE = 3;



type mapCanvasProps = {
  defaultFloor: number;
  startLocation: string;
  pathfinding: boolean;
  endLocation: string;
  onDeselectEndLocation?: () => void;
};


export default function MapCanvas(props: mapCanvasProps) {

  const X_MULT = getMapData().width / MAP_BASE.WIDTH;
  const Y_MULT = getMapData().height / MAP_BASE.HEIGHT;

  // map data
  const [mouseData, setMouseData] = useState({
    pos: { x: 0, y: 0 },
    down: false,
    downPos: { x: 0, y: 0 },
  });
  const [viewingFloor, setViewingFloor] = useState(props.defaultFloor);
  const [nodes, setNodes] = useState<node[]>([]);
  const [edges, setEdges] = useState<edge[]>([]);
  const [cameraControl, setCameraControl] = useState({
    pan: { x: 0, y: 0 },
    panAnchor: { x: 0, y: 0 },
    zoom: 1,
    zoomDelta: 0,
  });
  const [renderData, setRenderData] = useState<{ n: node[]; e: edge[] }>({
    n: [],
    e: [],
  });
  const [pathing, setPathing] = useState<{
    selectedPoint: vec2 | null;
    path: node[];
    nearestNode: node | null;
  }>({
    selectedPoint: null,
    path: [],
    nearestNode: null,
  });
  const [draggingNode, setDraggingNode] = useState<node | null>(null);

  // canvas data
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const image = useMemo(() => {
    const image: CanvasImageSource = new Image();
    image.src = MAPS[viewingFloor];
    return image;
  }, [viewingFloor]);

  useEffect(() => {
    setRenderData({
      n: nodes.filter((n: node) => n.point.z === props.defaultFloor),
      e: edges.filter((e: edge) => e.startNode.point.z === props.defaultFloor),
    });
    setViewingFloor(props.defaultFloor);
  }, [edges, nodes, props.defaultFloor]);

  function handleSetViewingFloor(i: number) {
    // update the render data
    setRenderData({
      n: nodes.filter((n: node) => n.point.z === i),
      e: edges.filter((e: edge) => e.startNode.point.z === i),
    });
    setViewingFloor(i);
  }

  // draw to canvas
  useEffect(() => {
    function canvasDraw() {
      const canv = canvasRef.current!;
      const ctx = canv.getContext("2d")!;
      ctx.clearRect(0, 0, canv.width, canv.height);
      ctx.drawImage(
        image,
        cameraControl.pan.x,
        cameraControl.pan.y,
        canv.width / cameraControl.zoom,
        canv.height / cameraControl.zoom,
      );

      function vecToCanvSpace(a: vec2) {
        return {
          x: (a.x / cameraControl.zoom) * X_MULT + cameraControl.pan.x,
          y: (a.y / cameraControl.zoom) * Y_MULT + cameraControl.pan.y,
          z: a.z,
        };
      }

      function drawPoint(p: vec2) {
        p = vecToCanvSpace(p);
        if (p.z !== viewingFloor) return;
        ctx.arc(p.x, p.y, NODE_SIZE, 0, 2 * Math.PI);
      }

      function drawLine(a: vec2, b: vec2) {
        if (a.z !== viewingFloor) return;
        a = vecToCanvSpace(a);
        b = vecToCanvSpace(b);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }

      if (mouseData.down && draggingNode === null) return;

      // pathfinding here
      if (props.pathfinding) {
        if (
          pathing.selectedPoint === null &&
          (props.endLocation === undefined || props.endLocation === "")
        )
          return;
        ctx.lineWidth = 15;
        ctx.beginPath();
        if (pathing.selectedPoint !== null) drawPoint(pathing.selectedPoint);
        ctx.stroke();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.lineCap = "round";
        ctx.beginPath();
        for (let i = 0; i < pathing.path.length - 1; i++) {
          drawLine(pathing.path[i].point, pathing.path[i + 1].point);
          //ctx.font = "30px Arial";
          //ctx.fillText(i+"",vecToCanvSpace(pathing.path[i].point).x,vecToCanvSpace(pathing.path[i].point).y);
        }
        if (pathing.selectedPoint !== null)
          drawLine(
            pathing.path[pathing.path.length - 1].point,
            pathing.selectedPoint,
          );
        ctx.stroke();
      } else {
        for (const n of renderData.n) {
          ctx.lineWidth = 15;
          ctx.strokeStyle = "blue";
          if (n.nodeID === pathing.nearestNode?.nodeID) ctx.strokeStyle = "red";
          ctx.beginPath();
          drawPoint(n.point);
          ctx.stroke();
        }
        for (const e of renderData.e) {
          ctx.lineWidth = 5;
          ctx.strokeStyle = "blue";
          ctx.lineCap = "round";
          drawLine(e.startNode.point, e.endNode.point);
          ctx.stroke();
        }
      }
    }

    image.onload = () => {
      canvasDraw();
    };
    canvasDraw();
  }, [cameraControl.pan.x, cameraControl.pan.y, cameraControl.zoom, cameraControl.zoomDelta, image, mouseData.down, mouseData.downPos.x, mouseData.downPos.y, mouseData.pos.x, mouseData.pos.y, pathing.nearestNode?.nodeID, pathing.path, pathing.selectedPoint, props.pathfinding, renderData.e, renderData.n, viewingFloor, props.endLocation, draggingNode, X_MULT, Y_MULT]);

  // wheel
  useEffect(() => {
    window.addEventListener("wheel", handleZoom);

    function handleZoom(e: WheelEvent) {
      const velocity = Math.sign(e.deltaY);
      const z = clamp(
        cameraControl.zoom + ZOOM.SPEED * velocity,
        ZOOM.MIN,
        ZOOM.MAX,
      );

      const Qx =
        mouseData.pos.x -
        ((mouseData.pos.x - cameraControl.pan.x) /
          (canvasRef.current!.width / cameraControl.zoom)) *
          (canvasRef.current!.width / z);
      const Qy =
        mouseData.pos.y -
        ((mouseData.pos.y - cameraControl.pan.y) /
          (canvasRef.current!.height / cameraControl.zoom)) *
          (canvasRef.current!.height / z);

      setCameraControl({
        ...cameraControl,
        zoom: z,
        zoomDelta: velocity,
        pan: {
          x: Qx,
          y: Qy,
        },
      });
    }

    return () => {
      window.removeEventListener("wheel", handleZoom);
    };
  }, [cameraControl, mouseData.pos.x, mouseData.pos.y]);

  //mousemove
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    function handleMouseMove(e: MouseEvent) {
      const rect = canvasRef.current!.getBoundingClientRect(); // get element's abs. position
      const x =
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvasRef.current!.width;
      const y =
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvasRef.current!.height;
      setMouseData({
        ...mouseData,
        pos: {
          x: x,
          y: y,
        },
      });
      if (mouseData.down) {
        const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
        const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

        if (draggingNode === null) {
          const dx = x - mouseData.downPos.x;
          const dy = y - mouseData.downPos.y;
          setCameraControl({
            ...cameraControl,
            pan: {
              x: cameraControl.panAnchor.x + dx,
              y: cameraControl.panAnchor.y + dy,
            },
          });
        } else {
          draggingNode.point = { x: x2, y: y2, z: draggingNode.point.z };
        }
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [X_MULT, Y_MULT, cameraControl, draggingNode, mouseData]);

  //mousedown
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    function handleMouseDown(e: MouseEvent) {
      const rect = canvasRef.current!.getBoundingClientRect(); // get element's abs. position
      const x =
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvasRef.current!.width;
      const y =
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvasRef.current!.height;
      setMouseData({
        ...mouseData,
        pos: { x: x, y: y },
        down: true,
        downPos: { x: x, y: y },
      });
      setCameraControl({
        ...cameraControl,
        panAnchor: cameraControl.pan,
      });

      if (!props.pathfinding) {
        const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
        const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

        // Move point to nearest edge
        if (nodes === null) return;
        const closestNode = pointHelper({
          pos: { x: x2, y: y2, z: viewingFloor },
          nodes: nodes,
          floor: viewingFloor,
          distance: NODE_SIZE / cameraControl.zoom,
        });
        setDraggingNode(closestNode);
      }
    }

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [X_MULT, Y_MULT, cameraControl, edges, mouseData, nodes, pathing, props.pathfinding, props.startLocation, viewingFloor]);

  //dblclick
  useEffect(() => {
    window.addEventListener("dblclick", handleDblclick);

    function handleDblclick(e: MouseEvent) {
      const rect = canvasRef.current!.getBoundingClientRect(); // get element's abs. position
      const x =
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvasRef.current!.width;
      const y =
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvasRef.current!.height;

      const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
      const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

      // Move point to nearest edge
      if (nodes === null) return;
      const coords = graphHelper({
        pos: { x: x2, y: y2, z: viewingFloor },
        nodes: nodes,
        edges: edges,
        floor: viewingFloor,
      });
      if (coords === null) return;
      const closestNode = pointHelper({
        pos: coords,
        nodes: nodes,
        floor: viewingFloor,
      });
      if (closestNode === null) return;

      if (props.pathfinding) {
        axios
          .get(
            "/api/astar-api?&startNode=" +
              closestNode.nodeID +
              "&endNode=" +
              props.startLocation,
          )
          .then((res) => {
            const pathNodes: node[] = [];
            for (const s of res.data.path) {
              const n = nodes.find((no: node) => {
                return no.nodeID === s;
              });
              if (n === undefined) continue;
              pathNodes.push(n);
            }

            if (pathNodes === undefined || pathNodes.length === 0) {
              console.error("no path");
              return;
            }
            setPathing({
              ...pathing,
              path: pathNodes,
              selectedPoint: coords,
            });
            if (props.onDeselectEndLocation !== undefined)
              props.onDeselectEndLocation();
          });
      } else {
        if (pathing.nearestNode?.nodeID === closestNode.nodeID) {
          setPathing({
            ...pathing,
            selectedPoint: coords,
            nearestNode: null,
          });
        } else {
          setPathing({
            ...pathing,
            selectedPoint: coords,
            nearestNode: closestNode,
          });
        }
      }
    }

    return () => {
      window.removeEventListener("dblclick", handleDblclick);
    };
  }, [X_MULT, Y_MULT, cameraControl, edges, mouseData, nodes, pathing, props, props.pathfinding, props.startLocation, viewingFloor]);

  //mouseup
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    function handleMouseUp() {
      setMouseData({ ...mouseData, down: false });
      setDraggingNode(null);
      setDraggingNode(null);
    }

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseData]);

  // Init data
  useEffect(() => {
    axios.get("/api/map").then((res: AxiosResponse) => {
      const ns: node[] = [];
      const es: edge[] = [];

      for (const r of res.data.nodes) {
        const v: vec2 = {
          x: r.xcoord,
          y: r.ycoord,
          z: FLOOR_NAME_TO_INDEX(r.floor),
        };
        const n: node = {
          nodeID: r.nodeID,
          point: v,
          nodeType: r.nodeType,
          longName: r.longName,
          building: r.building,
          shortName: r.shortName,
          floor: r.floor,
        };
        ns.push(n);
      }

      for (const r of res.data.edges) {
        const start: node | undefined = ns.find((n: node) => {
          return n.nodeID === r["startNodeID"];
        });
        if (start === undefined) continue;
        const end: node | undefined = ns.find((n: node) => {
          return n.nodeID === r["endNodeID"];
        });
        if (end === undefined) continue;
        const e: edge = { startNode: start, endNode: end };
        es.push(e);
      }

      setNodes(ns);
      setEdges(es);
    });
  }, []);

  useEffect(() => {
    if (props.endLocation !== "" && props.endLocation !== undefined) {
      if (
        pathing.path.length > 0 &&
        pathing.path[0].nodeID === props.startLocation &&
        pathing.path[pathing.path.length - 1].nodeID === props.endLocation
      )
        return;
      axios
        .get(
          "/api/astar-api?&startNode=" +
            props.endLocation +
            "&endNode=" +
            props.startLocation,
        )
        .then((res) => {
          const pathNodes: node[] = [];
          for (const s of res.data.path) {
            const n = nodes.find((no: node) => {
              return no.nodeID === s;
            });
            if (n === undefined) continue;
            pathNodes.push(n);
          }

          if (pathNodes === undefined || pathNodes.length === 0) {
            console.error("no path");
            return;
          }
          setPathing({
            ...pathing,
            path: pathNodes,
            selectedPoint: null,
          });
        });
    }
  }, [pathing, nodes, props.endLocation, props.startLocation]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "90vh",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/*<canvas*/}
        {/*  width={MAP_WIDTH}*/}
        {/*  height={MAP_HEIGHT}*/}
        {/*  style={{*/}
        {/*    aspectRatio: BASE_MAP_WIDTH + "/" + BASE_MAP_HEIGHT,*/}
        {/*  }}*/}
        {/*  ref={canvasRef}*/}
        {/*/>*/}
        <svg width="100%" height="100%">
          <image
            href={MAPS[viewingFloor]}
            width={getMapData().width / cameraControl.zoom}
            height={getMapData().height / cameraControl.zoom}
            x={cameraControl.pan.x}
            y={cameraControl.pan.y}
          />
        </svg>
      </Box>

      {!props.pathfinding && pathing.nearestNode !== null && (
        <InformationMenu
          nodeData={pathing.nearestNode}
          onClose={() => {
            setPathing({...pathing, nearestNode: null});
          }}
          onChangeNode={(node) => {
            setPathing({
              ...pathing,
              nearestNode: node,
            });
          }}
        />
      )}
      <MapControls
        floor={viewingFloor}
        zoom={cameraControl.zoom}
        zoomSpeed={ZOOM.SPEED * 10}
        onSetFloorIndex={(floorIndex: number) => {
          handleSetViewingFloor(floorIndex);
        }}
        onSetZoom={(zoom: number) => {
          setCameraControl({
            ...cameraControl,
            zoom: clamp(zoom, ZOOM.MIN, ZOOM.MAX),
          });
        }}
        onResetMap={() => {
          setCameraControl({
            ...cameraControl,
            zoom: 1,
            pan: {
              x: 0,
              y: 0,
            },
          });
        }}
      />
    </Box>
  );
}
