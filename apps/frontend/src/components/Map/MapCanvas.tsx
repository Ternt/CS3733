import React, {ReactNode, useEffect, useRef, useState} from "react";

import { Box } from "@mui/material";
import { edge, node, vec2 } from "../../helpers/typestuff.ts";
import axios, { AxiosResponse } from "axios";
import { graphHelper, pointHelper } from "../../helpers/clickCorrectionMath.ts";
import MapControls from "./MapControls.tsx";
import InformationMenu from "../InformationMenu.tsx";
import {MAPS, ZOOM, FLOOR_NAME_TO_INDEX, getMapData, MAP_BASE} from "../../helpers/MapHelper.ts";
import {clamp, distance} from "../../helpers/MathHelp.ts";
import AnimatedPath from "./AnimatedPath.tsx";



const NODE_SIZE = 3.1;



type mapCanvasProps = {
  defaultFloor: number;
  startLocation: string;
  pathfinding: string | null;
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
    algo: string;
  }>({
    selectedPoint: null,
    path: [],
    nearestNode: null,
    algo: ""
  });
  const [draggingNode, setDraggingNode] = useState<node | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgInject, setSvgInject] = useState<ReactNode[]>([]);
  const [pathStringInject, setPathStringInject] = useState("");
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
        <AnimatedPath svgPath={pathStringInject} />
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

  // Init the SVG
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

  // rendering
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
        return <ellipse
          key={"Point "+p.x+","+p.y+","+p.z}
          cx={p.x}
          cy={p.y}
          rx={NODE_SIZE}
          ry={NODE_SIZE}
          fill={color}
        />;
      }
      function drawLine(a: vec2, b: vec2, color: string) {
        if (a.z !== viewingFloor) return;
        a = vecToCanvSpace(a);
        b = vecToCanvSpace(b);
        return <line
          key={"Edge "+a.x+","+a.y+","+a.z+","+b.x+","+b.y+","+b.z}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={color}
          strokeWidth={NODE_SIZE*.5}
          strokeLinecap={"round"}
        />;
      }

      // pathfinding here
      const svgElements = [];
      if (props.pathfinding) {
        if (
          (pathing.selectedPoint === null &&
          (props.endLocation === undefined || props.endLocation === "")) ||
          (!pathing.path ||
          pathing.path.length < 1)
        )
          return;

        let pathString = "";
        let lastFloor = -1;
        const tryAddIcon = (a:vec2, isDest:boolean)=>{
          if(lastFloor !== a.z){
            let flip = lastFloor > a.z;
            console.log(a.z);
            a = vecToCanvSpace(a);
            const DOWN = "m480.385-332.309 145.768-145.768-41.768-41.768-74.001 74.001v-182.232h-60.383v182.232L376-519.845l-41.768 41.768 146.153 145.768Zm-.318 232.308q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933Z";
            const UP = "M450.001-332.309h60.383V-514.54l74.001 74 41.768-41.768-145.768-145.768-146.153 145.768L376-440.54l74.001-74v182.231Zm30.066 232.308q-78.836 0-148.204-29.92-69.369-29.92-120.682-81.21-51.314-51.291-81.247-120.629-29.933-69.337-29.933-148.173t29.92-148.204q29.92-69.369 81.21-120.682 51.291-51.314 120.629-81.247 69.337-29.933 148.173-29.933t148.204 29.92q69.369 29.92 120.682 81.21 51.314 51.291 81.247 120.629 29.933 69.337 29.933 148.173t-29.92 148.204q-29.92 69.369-81.21 120.682-51.291 51.314-120.629 81.247-69.337 29.933-148.173 29.933Z";
            const PIN = "M480-212.309q-136-101.307-202.999-196.23-67-94.923-67-185.467 0-68.389 24.538-119.922 24.539-51.533 63.128-86.379 38.589-34.846 86.825-52.269 48.236-17.423 95.508-17.423t95.508 17.423q48.236 17.423 86.825 52.269 38.589 34.846 63.128 86.379 24.538 51.533 24.538 119.922 0 90.544-67 185.467Q616-313.616 480-212.309Zm0-317.692q29.154 0 49.576-20.423 20.423-20.422 20.423-49.576t-20.423-49.576Q509.154-669.999 480-669.999t-49.576 20.423Q410.001-629.154 410.001-600t20.423 49.576q20.422 20.423 49.576 20.423Zm-269.999 440v-59.998h539.998v59.998H210.001Z";
            if(a.z === viewingFloor) {
              const wid = 10;
              svgElements.push(
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height={""+(wid*2)}
                  viewBox="0 -960 960 960"
                  width={""+(wid*2)}
                  x={a.x - wid}
                  y={a.y - wid}
                >
                  <path
                    d={isDest?PIN:(flip ? UP : DOWN)}
                    fill={"#012d5a"}
                    strokeWidth={'60px'} // Adjust the stroke width as needed
                    stroke={"#f6bd38"} // Adjust the color as needed
                    x={0}
                    y={0}
                    style={{
                      filter: "drop-shadow(10px 20px 30px #000)"
                    }}
                  />
                </svg>
              );
            }
            lastFloor = a.z;
            pathString += "M " + a.x + " " + a.y + ",";
          }
        };
        for (let i = 0; i < pathing.path.length - 1; i++) {
          // svgElements.push(drawLine(pathing.path[i].point, pathing.path[i + 1].point, "black"));
          const a = vecToCanvSpace(pathing.path[i].point);
          const b = vecToCanvSpace(pathing.path[i+1].point);
          tryAddIcon(pathing.path[i].point, i===0);

          if (a.z !== viewingFloor) continue;
          pathString += "L " + b.x + " " + b.y + ",";
        }
        // check that the selected point is
        if (pathing.selectedPoint !== null && pathing.path[pathing.path.length - 1].point.z === viewingFloor) {
          // svgElements.push(drawLine(pathing.path[pathing.path.length - 1].point, pathing.selectedPoint, "red"));
          const a = vecToCanvSpace(pathing.path[pathing.path.length - 1].point);
          const b = vecToCanvSpace(pathing.selectedPoint);
          if(lastFloor !== pathing.selectedPoint.z){
            pathString += "M "+a.x+" "+a.y+",";
          }
          pathString += "L " + b.x + " " + b.y + ",";
        }
        setPathStringInject(pathString);
      } else {
        for (const n of renderData.n) {
          svgElements.push(drawPoint(n.point, (n.nodeID === pathing.nearestNode?.nodeID ? "red" : "blue")));
        }
        for (const e of renderData.e) {
          svgElements.push(drawLine(e.startNode.point, e.endNode.point, "blue"));
        }
      }
      setSvgInject(svgElements);
    }

    canvasDraw();
  }, [mouseData.down, mouseData.downPos.x, mouseData.downPos.y, mouseData.pos.x, mouseData.pos.y, pathing.nearestNode?.nodeID, pathing.path, pathing.selectedPoint, props.pathfinding, renderData.e, renderData.n, viewingFloor, props.endLocation, draggingNode, X_MULT, Y_MULT]);

  // event handles
  useEffect(() => {
    const el = svgRef.current!;
    el.addEventListener("wheel", handleZoom);
    el.addEventListener("mousemove",handleMouseMove);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    //el.addEventListener("dblclick", handleDblclick);
    return () => {
      el.removeEventListener("wheel", handleZoom);
      el.removeEventListener("mousemove",handleMouseMove);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      //el.removeEventListener("dblclick", handleDblclick);
    };
  }, [handleDblclick, handleMouseDown, handleMouseMove, handleMouseUp, handleZoom]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleZoom(e: WheelEvent) {
    const velocity = Math.sign(e.deltaY);
    const z = clamp(cameraControl.zoom + ZOOM.SPEED * velocity, ZOOM.MIN, ZOOM.MAX,);

    const Qx = mouseData.pos.x - ((mouseData.pos.x - cameraControl.pan.x) / (svgRect.width / cameraControl.zoom)) * (svgRect.width / z);
    const Qy = mouseData.pos.y - ((mouseData.pos.y - cameraControl.pan.y) / (svgRect.height / cameraControl.zoom)) * (svgRect.height / z);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleDblclick(e: MouseEvent) {
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
    const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

    // Move point to nearest edge
    if (nodes === null) return;
    const graphResponse = graphHelper({
      pos: {x: x2, y: y2, z: viewingFloor},
      nodes: nodes,
      edges: edges,
      floor: viewingFloor,
    });
    if(graphResponse === null) return;
    const coords = graphResponse.point;
    const closestEdge = graphResponse.edge;
    if (coords === null || closestEdge === null) return;
    let closestNode = closestEdge!.startNode;
    if(distance(closestEdge!.startNode.point, coords) > distance(closestEdge!.endNode.point, coords))
      closestNode = closestEdge!.endNode;

    if (props.pathfinding) {
      axios
        .get("/api/pathfind?startNode=" + closestNode.nodeID + "&endNode=" + props.startLocation +"&algorithm=" +props.pathfinding,)
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

          if(pathNodes.length > 2){
            if(pathNodes[pathNodes.length-2].nodeID === closestEdge.startNode.nodeID && pathNodes[pathNodes.length-1].nodeID === closestEdge.endNode.nodeID){
              pathNodes.pop();
            }
            else if(pathNodes[pathNodes.length-2].nodeID === closestEdge.endNode.nodeID && pathNodes[pathNodes.length-1].nodeID === closestEdge.startNode.nodeID){
              pathNodes.pop();
            }
          }

          setPathing({
            ...pathing,
            path: pathNodes,
            selectedPoint: coords,
            algo: props.pathfinding!
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleMouseUp(e: MouseEvent) {
    // check if the mouse down pos and mouse up pos are the same, if so call dbl

    const dp = mouseData.downPos;
    const up = mouseData.pos;
    if(dp.x === up.x && dp.y === up.y){
      handleDblclick(e);
    }

    setMouseData({...mouseData, down: false});
    setDraggingNode(null);
    setDraggingNode(null);
  }

  useEffect(()=>{
    if(props.pathfinding !== null && props.pathfinding !== pathing.algo && pathing.selectedPoint !== null){
      const x2 = pathing.selectedPoint.x;
      const y2 = pathing.selectedPoint.y;

      // Move point to nearest edge
      if (nodes === null) return;
      const graphResponse = graphHelper({
        pos: {x: x2, y: y2, z: viewingFloor},
        nodes: nodes,
        edges: edges,
        floor: viewingFloor,
      });
      if(graphResponse === null) return;
      const coords = graphResponse.point;
      const closestEdge = graphResponse.edge;
      if (coords === null || closestEdge === null) return;
      let closestNode = closestEdge!.startNode;
      if(distance(closestEdge!.startNode.point, coords) > distance(closestEdge!.endNode.point, coords))
        closestNode = closestEdge!.endNode;

      if (props.pathfinding) {
        axios
          .get("/api/pathfind?startNode=" + closestNode.nodeID + "&endNode=" + props.startLocation +"&algorithm=" +props.pathfinding,)
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

            if(pathNodes.length > 2){
              if(pathNodes[pathNodes.length-2].nodeID === closestEdge.startNode.nodeID && pathNodes[pathNodes.length-1].nodeID === closestEdge.endNode.nodeID){
                pathNodes.pop();
              }
              else if(pathNodes[pathNodes.length-2].nodeID === closestEdge.endNode.nodeID && pathNodes[pathNodes.length-1].nodeID === closestEdge.startNode.nodeID){
                pathNodes.pop();
              }
            }

            setPathing({
              ...pathing,
              path: pathNodes,
              selectedPoint: coords,
              algo: props.pathfinding!
            });
          });
      }
    }
  }, [edges, nodes, pathing, pathing.algo, props.pathfinding, props.startLocation, viewingFloor]);

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

  // Update pathing if selection dropdown changes
  useEffect(() => {
    if (props.endLocation !== "" && props.endLocation !== undefined) {
      if (
        pathing.path.length > 0 &&
        pathing.path[0].nodeID === props.startLocation &&
        pathing.path[pathing.path.length - 1].nodeID === props.endLocation &&
        props.pathfinding === pathing.algo
      )
        return;
      if(props.pathfinding === null)
        return;
      axios
        .get("/api/pathfind?startNode=" +props.endLocation + "&endNode=" + props.startLocation +"&algorithm=" +props.pathfinding)
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
            algo: props.pathfinding!
          });
        });
    }
  }, [pathing, nodes, props.endLocation, props.startLocation, props.pathfinding]);

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
        zoomSpeed={ZOOM.SPEED * 3}
        onSetFloorIndex={(floorIndex: number) => {
          handleSetViewingFloor(floorIndex);
        }}
        onSetZoom={(z: number) => {
          const zc = clamp(z, ZOOM.MIN, ZOOM.MAX,);
          const mx = (svgRect.width / 2) ;
          const my = (svgRect.height / 2);
          const Qx = mx - ((mx - cameraControl.pan.x) / (svgRect.width / cameraControl.zoom)) * (svgRect.width / zc);
          const Qy = my - ((my - cameraControl.pan.y) / (svgRect.height / cameraControl.zoom)) * (svgRect.height / zc);

          setCameraControl({
            ...cameraControl,
            zoom: zc,
            pan: {
              x: Qx,
              y: Qy,
            },
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
