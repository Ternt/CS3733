import React, {ReactNode, useEffect, useRef, useState} from "react";

import { Box } from "@mui/material";
import { edge, node, vec2 } from "../../helpers/typestuff.ts";
import axios, { AxiosResponse } from "axios";
import { graphHelper, pointHelper } from "../../helpers/clickCorrectionMath.ts";
import MapControls from "./MapControls.tsx";
import InformationMenu from "../InformationMenu.tsx";
import {MAPS, ZOOM, clamp, FLOOR_NAME_TO_INDEX, getMapData, MAP_BASE} from "./MapHelper.ts";


const NODE_SIZE = 3.1;



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
    pos: {x: 0, y: 0},
    down: false,
    downPos: {x: 0, y: 0},
  });
  const [viewingFloor, setViewingFloor] = useState(props.defaultFloor);
  const [nodes, setNodes] = useState<node[]>([]);
  const [edges, setEdges] = useState<edge[]>([]);
  const [cameraControl, setCameraControl] = useState({
    pan: {x: 0, y: 0},
    panAnchor: {x: 0, y: 0},
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
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgInject, setSvgInject] = useState<ReactNode[]>([]);
  const svgElementInjector = (
    <svg
      width="100%"
      height="100%"
      ref={svgRef}
    >
      <image
        href={MAPS[viewingFloor]}
        width={getMapData().width / cameraControl.zoom}
        height={getMapData().height / cameraControl.zoom}
        x={cameraControl.pan.x}
        y={cameraControl.pan.y}
      />
      <g
        transform={"translate("+cameraControl.pan.x+" "+cameraControl.pan.y+") scale("+(1/cameraControl.zoom)+" "+(1/cameraControl.zoom)+")"}
      >
        {svgInject}
      </g>
    </svg>
  );

  // canvas data

  const [svgRect, setSvgRect] = useState({
    width:0,
    height:0,
    top:0,
    bottom:0,
    left:0,
    right:0
  });

  useEffect(() => {

    if(svgRef.current){
      const r = svgRef.current.getBoundingClientRect();
      setSvgRect({
        width:r.width,
        height:r.height,
        top:r.top,
        bottom:r.bottom,
        left:r.left,
        right:r.right,
      });
    }
  }, []);


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

      function vecToCanvSpace(a: vec2) {
        return {
          x: (a.x) * X_MULT,// + cameraControl.pan.x,
          y: (a.y) * Y_MULT,// + cameraControl.pan.y,
          z: a.z,
        };
      }

      function drawPoint(p: vec2, color: string) {
        p = vecToCanvSpace(p);
        if (p.z !== viewingFloor) return;
        return <ellipse cx={p.x} cy={p.y} rx={NODE_SIZE} ry={NODE_SIZE} fill={color}/>;
      }

      function drawLine(a: vec2, b: vec2) {
        if (a.z !== viewingFloor) return;
        a = vecToCanvSpace(a);
        b = vecToCanvSpace(b);
        return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={"blue"}/>;
      }

      // pathfinding here
      const svgElements = [];
      if (props.pathfinding) {
        if (
          pathing.selectedPoint === null &&
          (props.endLocation === undefined || props.endLocation === "")
        )
          return;

        if (pathing.selectedPoint !== null)
          svgElements.push(drawPoint(pathing.selectedPoint, "blue"));
        for (let i = 0; i < pathing.path.length - 1; i++) {
          svgElements.push(drawLine(pathing.path[i].point, pathing.path[i + 1].point));
        }
        if (pathing.selectedPoint !== null)
          svgElements.push(drawLine(pathing.path[pathing.path.length - 1].point, pathing.selectedPoint));
      } else {
        for (const n of renderData.n) {
          svgElements.push(drawPoint(n.point, (n.nodeID === pathing.nearestNode?.nodeID ? "red" : "blue")));
        }
        for (const e of renderData.e) {
          svgElements.push(drawLine(e.startNode.point, e.endNode.point));
        }
      }
      setSvgInject(svgElements);
    }

    canvasDraw();
  }, [mouseData.down, mouseData.downPos.x, mouseData.downPos.y, mouseData.pos.x, mouseData.pos.y, pathing.nearestNode?.nodeID, pathing.path, pathing.selectedPoint, props.pathfinding, renderData.e, renderData.n, viewingFloor, props.endLocation, draggingNode, X_MULT, Y_MULT]);

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
          (svgRect.width / cameraControl.zoom)) *
        (svgRect.width / z);
      const Qy =
        mouseData.pos.y -
        ((mouseData.pos.y - cameraControl.pan.y) /
          (svgRect.height / cameraControl.zoom)) *
        (svgRect.height / z);

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
  }, [cameraControl, mouseData.pos.x, mouseData.pos.y, svgRect.height, svgRect.width]);

  //mousemove
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    function handleMouseMove(e: MouseEvent) {

      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;
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
          draggingNode.point = {x: x2, y: y2, z: draggingNode.point.z};
        }
      }
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [X_MULT, Y_MULT, cameraControl, draggingNode, mouseData, svgRect.left, svgRect.top]);

  //mousedown
  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    function handleMouseDown(e: MouseEvent) {
      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;
      setMouseData({
        ...mouseData,
        pos: {x: x, y: y},
        down: true,
        downPos: {x: x, y: y},
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
          pos: {x: x2, y: y2, z: viewingFloor},
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
  }, [X_MULT, Y_MULT, cameraControl, edges, mouseData, nodes, pathing, props.pathfinding, props.startLocation, svgRect.left, svgRect.top, viewingFloor]);

  //dblclick
  useEffect(() => {
    window.addEventListener("dblclick", handleDblclick);

    function handleDblclick(e: MouseEvent) {
      const x = e.clientX - svgRect.left;
      const y = e.clientY - svgRect.top;

      const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
      const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

      // Move point to nearest edge
      if (nodes === null) return;
      const coords = graphHelper({
        pos: {x: x2, y: y2, z: viewingFloor},
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
  }, [X_MULT, Y_MULT, cameraControl, edges, mouseData, nodes, pathing, props, props.pathfinding, props.startLocation, svgRect.left, svgRect.top, viewingFloor]);

  //mouseup
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    function handleMouseUp() {
      setMouseData({...mouseData, down: false});
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
        const e: edge = {startNode: start, endNode: end};
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
        {svgElementInjector}
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
