import React, {ReactNode, useEffect, useRef, useState} from "react";

import {Box, IconButton, Snackbar} from "@mui/material";
import { edge, node, vec2 } from "../../helpers/typestuff.ts";
import axios, { AxiosResponse } from "axios";
import { graphHelper, pointHelper } from "../../helpers/clickCorrectionMath.ts";
import MapControls from "./MapControls.tsx";
import NodeInformationMenu from "./NodeInformationMenu.tsx";
import {
  MAPS,
  ZOOM,
  FLOOR_NAME_TO_INDEX,
  getMapData,
  MAP_BASE,
  FLOOR_IDS
} from "../../helpers/MapHelper.ts";
import {clamp, distance} from "../../helpers/MathHelp.ts";
import AnimatedPath from "./AnimatedPath.tsx";
import CloseIcon from "@mui/icons-material/Close";
import {evaluateHeatGradient} from "../../helpers/colorHelper.ts";
import {AnimatePresence, motion} from "framer-motion";
import {ICONS} from "./MapIcons.tsx";

const NODE_SIZE = 3.1;

type mapCanvasProps = {
  defaultFloor: number;
  startLocation: string;
  pathfinding: string | null;
  endLocation: string;
  onDeselectEndLocation?: () => void;
  onGetNearestNode?: (node: node | null) => void;
  mobile?:boolean;
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
  const [showIcons, setShowIcons] = useState<boolean[]>(Array.from(ICONS, ()=>{return false;}));
  const [viewMode, setViewMode] = useState('normal');
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

    useEffect(() => {
        if (props.onGetNearestNode === undefined) {
            return;
        }
        props.onGetNearestNode(pathing.nearestNode);
    }, [pathing.nearestNode, props]);

  const [draggingNode, setDraggingNode] = useState<node | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgInject, setSvgInject] = useState<ReactNode[]>([]);
  const [pathStringInject, setPathStringInject] = useState("");
  const [notification, setNotification] = useState('');
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
        filter={viewMode==='heatmap' ? "url(#darken)" : ''}
      />
      <defs>
        <filter
          id="blurfilter"
          x="-100%"
          y="-100%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur
            stdDeviation="4.453736"
            id="feGaussianBlur"/>
        </filter>
        <filter id="darken" x="0" y="0" width="100%" height="100%">
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.5" intercept="0.05"></feFuncR>
            <feFuncG type="linear" slope="0.5" intercept="0.05"></feFuncG>
            <feFuncB type="linear" slope="0.5" intercept="0.1"></feFuncB>
          </feComponentTransfer>
        </filter>
      </defs>
      <g
        transform={"translate(" + cameraControl.pan.x + " " + cameraControl.pan.y + ") scale(" + (1 / cameraControl.zoom) + " " + (1 / cameraControl.zoom) + ")"}
      >
        <AnimatedPath svgPath={pathStringInject}/>
        <g
          filter={viewMode==='heatmap' ? "url(#blurfilter)" : ''}
        >
          {svgInject}
        </g>
        {
          ICONS.map((ico, index)=>{
            if(showIcons[index])
              return ico.icon;
            return <></>;
          })
        }
      </g>
    </svg>
  );

  // canvas data

  const [svgRect, setSvgRect] = useState({
    width: 0,
    height: 0,
    top: 0,
    bottom: 0,
    left: 0,
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
    //setViewingFloor(viewingFloor);
  }, [edges, nodes, props.defaultFloor]);

  function handleSetViewingFloor(i: number) {
    // update the render data
    setRenderData({
      n: nodes.filter((n: node) => n.point.z === i),
      e: edges.filter((e: edge) => e.startNode.point.z === i),
    });
    setViewingFloor(i);
    setCameraControl({
      ...cameraControl,
      zoom: 1,
      pan: {
        x: 0,
        y: 0,
      },
    });
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

      function drawPoint(p: vec2, selected:boolean, dragging:boolean, id:string) {
        p = vecToCanvSpace(p);
        if (p.z !== viewingFloor) return;
        return (
          <AnimatePresence>
            <motion.ellipse
              initial={{ opacity: dragging?1:0, scale: dragging?(selected?1.5:1):0, fill:"#012d5a"}}
              exit={{ opacity: dragging?1:0, scale: dragging?(selected?1.5:1):0, fill:"#012d5a"}}
              animate={{ opacity: 1, scale: (selected?1.5:1), fill:selected?"red":"#012d5a"}}
              transition={{
                duration: dragging?0:2,
                delay: 0,
                ease: [0, 0.11, 0.2, 1.01]
              }}
              style={{
                filter: "drop-shadow(1px 1px 2px #00000020)"
              }}
              key={"Point "+p.x+","+p.y+","+p.z}
              cx={p.x}
              cy={p.y}
              rx={NODE_SIZE}
              ry={NODE_SIZE}
              id={id}
            />
          </AnimatePresence>);
      }
      function drawLine(a: vec2, b: vec2, color: string, width:number, noAnimate:boolean) {
        if (a.z !== viewingFloor) return;
        a = vecToCanvSpace(a);
        b = vecToCanvSpace(b);
        return <motion.line
          key={"Edge "+a.x+","+a.y+","+a.z+","+b.x+","+b.y+","+b.z}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={color}
          strokeLinecap={"round"}
          initial={{ strokeWidth: noAnimate ? 1.2 : 0}}
          animate={{ strokeWidth: viewMode==='heatmap' ? width! : 1.2}}
          transition={{
            duration: noAnimate? 0 : (viewMode==='heatmap'? 2 : 0.5),
            delay:viewMode==='heatmap'?.5:0,
            ease: [0, 0.71, 0.2, 1.01]
          }}
          style={{
            filter: "drop-shadow(1px 1px 2px #000)"
          }}
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
            a = vecToCanvSpace(a);
            const PIN = "M7 17.5C4.65 15.7667 2.89583 14.0833 1.7375 12.45C0.579167 10.8167 0 9.21667 0 7.65C0 6.46667 0.2125 5.42917 0.6375 4.5375C1.0625 3.64583 1.60833 2.9 2.275 2.3C2.94167 1.7 3.69167 1.25 4.525 0.95C5.35833 0.65 6.18333 0.5 7 0.5C7.81667 0.5 8.64167 0.65 9.475 0.95C10.3083 1.25 11.0583 1.7 11.725 2.3C12.3917 2.9 12.9375 3.64583 13.3625 4.5375C13.7875 5.42917 14 6.46667 14 7.65C14 9.21667 13.4208 10.8167 12.2625 12.45C11.1042 14.0833 9.35 15.7667 7 17.5Z";
            if(a.z === viewingFloor) {
              const wid = 7;
              svgElements.push(
              <svg
                width="14"
                height="18"
                viewBox="-1 -1 15 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                x={a.x - 1 - wid}
                y={a.y - 1 - wid * 2}
              >
                <path
                  d={PIN}
                  fill={"#012d5a"}
                  style={{
                    filter: "drop-shadow(10px 20px 30px #000)"
                  }}
                  onClick={()=>{
                      setViewingFloor(lastFloor);

                  }
                }

                />
                <text
                  fill={"#f6bd38"}
                  y={wid + 2.5}
                  x={wid/2 - .4}
                  style={{
                    fontSize:wid+"px",
                    fontWeight:800,
                    fontFamily: 'Open Sans',
                  }}
                >
                  {(!isDest)?FLOOR_IDS[lastFloor]:<>&nbsp;●</>}
                </text>
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
        setPathStringInject(pathString);
      } else {
        let min=0, max=0;
        for (const e of renderData.e) {
          const h = e.heat;
          if(h < min)min=h;
          if(h > max)max=h;
        }
        for (const e of renderData.e) {
          const heat = (e.heat - min) / (max - min);
          let color = "#f6bd38";
          if(viewMode==='heatmap')
            color = evaluateHeatGradient(heat);
          svgElements.push(drawLine(e.startNode.point, e.endNode.point, color, 10*heat+5, e.endNode.nodeID === draggingNode?.nodeID || e.startNode.nodeID === draggingNode?.nodeID));
        }
        if(viewMode==='edit')
          for (const n of renderData.n) {
            svgElements.push(drawPoint(n.point, (n.nodeID === pathing.nearestNode?.nodeID), draggingNode === n, n.nodeID));
          }
      }
      setSvgInject(svgElements);
    }

    canvasDraw();
  }, [mouseData.down, mouseData.downPos.x, mouseData.downPos.y, mouseData.pos.x, mouseData.pos.y, pathing.nearestNode?.nodeID, pathing.path, pathing.selectedPoint, props.pathfinding, renderData.e, renderData.n, viewingFloor, props.endLocation, draggingNode, X_MULT, Y_MULT, viewMode]);

  // event handles
  useEffect(() => {
    const el = svgRef.current!;
    el.addEventListener("wheel", handleZoom);
    el.addEventListener("mousemove",handleMouseMove);
    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("dblclick", handleDblclick);
    return () => {
      el.removeEventListener("wheel", handleZoom);
      el.removeEventListener("mousemove",handleMouseMove);
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("dblclick", handleDblclick);
    };
  }, [handleDblclick, handleMouseDown, handleMouseMove, handleMouseUp, handleZoom]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleDblclick(e:MouseEvent){
    if (props.pathfinding || viewMode!=='edit') {
      return;
    }

    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    const x2 = Math.round((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
    const y2 = Math.round((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

    // Move point to nearest edge
    if (nodes === null) return;
    const pos:vec2 = {x: x2, y: y2, z: viewingFloor};
    const graphResponse = graphHelper({
      pos: pos,
      nodes: nodes,
      edges: edges,
      floor: viewingFloor,
    });
    if (graphResponse === null || graphResponse.point === null || graphResponse.edge === null) return;
    const newNode: node = {
      point: pos,
      nodeID: ((Date.now()+"").substring((Date.now()+"").length/2)),
      nodeType: "HALL",
      longName: "A new node",
      building: "Unknown building",
      shortName: "A new node",
      floor: FLOOR_IDS[viewingFloor],
    };
    const N = nodes;
    N.push(newNode);
    setNodes(N);
    setNotification("Added a new node");
    const editedNode = {
      nodeID: newNode.nodeID,
      xcoord: Math.round(newNode.point.x),
      ycoord: Math.round(newNode.point.y),
      floor: newNode.floor,
      building: newNode.building,
      longName: newNode.longName,
      shortName: newNode.shortName,
      nodeType: newNode.nodeType
    };

    // Send a PUT request to the server
    await fetch("/api/nodes/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedNode),
    });
    setPathing({...pathing, nearestNode:newNode});
    initializeData();
  }

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
      } else if(viewMode==='edit'){
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

    if (!props.pathfinding && viewMode==='edit') {
      const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
      const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;

      // Move point to nearest edge
      if (nodes === null) return;
      const closestNode = pointHelper({
        pos: {x: x2, y: y2, z: viewingFloor},
        nodes: nodes,
        floor: viewingFloor,
        distance: 15
      });
      setDraggingNode(closestNode);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleClickNode(e: MouseEvent) {
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    const x2 = ((x - cameraControl.pan.x) * cameraControl.zoom) / X_MULT;
    const y2 = ((y - cameraControl.pan.y) * cameraControl.zoom) / Y_MULT;
    const pos:vec2 =  {x: x2, y: y2, z: viewingFloor};
    if (props.pathfinding) {
      if(props.startLocation === ''){
        setNotification("Select a start location");
        return;
      }
      // Move point to nearest edge
      if (nodes === null) return;
      const graphResponse = graphHelper({
        pos: pos,
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
      pathing.nearestNode = closestNode;
      axios
        .get("/api/pathfind?endNode=" + closestNode.nodeID + "&startNode=" + props.startLocation +"&algorithm=" +props.pathfinding,)
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
          setViewingFloor(FLOOR_NAME_TO_INDEX(pathNodes[pathNodes.length - 1].floor!));
          setCameraControl({
            ...cameraControl,
            zoom: 1,
            pan: {
              x: 0,
              y: 0,
            },
          });
          if (props.onDeselectEndLocation !== undefined)
            props.onDeselectEndLocation();
        });
    } else {
      if(viewMode!=='edit')return;
      const closestNode = pointHelper({
        pos:pos,
        floor:viewingFloor,
        nodes:nodes,
        distance: 400,
      });
      if (closestNode && pathing.nearestNode?.nodeID === closestNode.nodeID) {
        setPathing({
          ...pathing,
          selectedPoint: pos,
          nearestNode: null,
        });
      } else {
        setPathing({
          ...pathing,
          selectedPoint: pos,
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
      handleClickNode(e);
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
          .get("/api/pathfind?endNode=" + closestNode.nodeID + "&startNode=" + props.startLocation +"&algorithm=" +props.pathfinding,)
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
            setViewingFloor(FLOOR_NAME_TO_INDEX(pathNodes[pathNodes.length - 1].floor!));
            setCameraControl({
              ...cameraControl,
              zoom: 1,
              pan: {
                x: 0,
                y: 0,
              },
            });
            setPathing({
              ...pathing,
              path: pathNodes,
              selectedPoint: coords,
              algo: props.pathfinding!
            });
          });
      }
    }
  }, [cameraControl, edges, nodes, pathing, pathing.algo, props.pathfinding, props.startLocation, viewingFloor]);

  // Init data
  useEffect(() => {
    initializeData();
  }, []);
  function initializeData(){
    axios.get("/api/map").then((res: AxiosResponse) => {
      const ns: node[] = [];
      const es: edge[] = [];

      const FLOOR_OFFSETS = [
        {x: 45, y: -20},
        {x: 20, y: 3},
        {x: 0, y: 0},
        {x: 0, y: 0},
        {x: 0, y: 0},
      ];

      for (const r of res.data.nodes) {
        const v: vec2 = {
          x: FLOOR_OFFSETS[FLOOR_NAME_TO_INDEX(r.floor)].x + r.xcoord,
          y: FLOOR_OFFSETS[FLOOR_NAME_TO_INDEX(r.floor)].y + r.ycoord,
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
        const e: edge = {startNode: start, endNode: end, heat:r.heat};
        es.push(e);
      }

      setNodes(ns);
      setEdges(es);
    });
  }

  // Update pathing if selection dropdown changes
  useEffect(() => {
    if (props.endLocation !== "" && props.endLocation !== undefined) {
      if (
        pathing.path.length > 0 &&
        pathing.path[pathing.path.length - 1].nodeID === props.startLocation &&
        pathing.path[0].nodeID === props.endLocation &&
        props.pathfinding === pathing.algo
      )
        return;
      if(props.pathfinding === null)
        return;
      axios
        .get("/api/pathfind?endNode=" +props.endLocation + "&startNode=" + props.startLocation +"&algorithm=" +props.pathfinding)
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
          setViewingFloor(FLOOR_NAME_TO_INDEX(pathNodes[pathNodes.length - 1].floor!));
          setCameraControl({
            ...cameraControl,
            zoom: 1,
            pan: {
              x: 0,
              y: 0,
            },
          });
        });
    }
  }, [pathing, nodes, props.endLocation, props.startLocation, props.pathfinding, cameraControl]);

  return (
    <>
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
          <NodeInformationMenu
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
            onPulseUpdate={()=>{
              initializeData();
            }}
            edges={edges}
            nodes={nodes}
          />
        )}
        <MapControls
          floor={viewingFloor}
          zoom={cameraControl.zoom}
          zoomSpeed={ZOOM.SPEED * 3}
          mobile={props.mobile}
          viewMode={viewMode}
          showViewModeSelector={props.pathfinding===null}
          onSetFloorIndex={(floorIndex: number) => {
            handleSetViewingFloor(floorIndex);
          }}
          onSetViewMode={(vm)=>{
            setViewMode(vm);
            if(vm !== 'edit')
              setPathing({...pathing, nearestNode:null});
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
          showIcons={showIcons}
          onSetShowIcons={setShowIcons}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
        open={notification !== ''}
        onClose={()=>{
          setNotification('');
        }}
        autoHideDuration={5000}
        message={notification}
        key={"Notif"}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={()=>{
              setNotification('');
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </>
  );
}
