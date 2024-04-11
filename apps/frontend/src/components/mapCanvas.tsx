//import React, { useEffect, useMemo, useRef, useState } from "react";
//import axios, { AxiosResponse } from "axios";
//import {
//  graphHelper,
//  pointHelper,
//  customPathHelper,
//} from "../helpers/clickCorrectionMath.ts";
//import { vec2, node, edge } from "../helpers/typestuff.ts";
//
//import L0 from "../assets/BWHospitalMaps/00_thelowerlevel2.png";
//import L1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
//import L2 from "../assets/BWHospitalMaps/01_thefirstfloor.png";
//import L3 from "../assets/BWHospitalMaps/02_thesecondfloor.png";
//import L4 from "../assets/BWHospitalMaps/03_thethirdfloor.png";
//
//import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
//import PinDropIcon from "@mui/icons-material/PinDrop";
//
//const MAPS = [L0, L1, L2, L3, L4];
//const ZOOM_SPEED = 0.01;
//const ZOOM_MAX = 2.0;
//const ZOOM_MIN = 1;
//
//function FLOOR_NAME_TO_INDEX(f: string) {
//  switch (f) {
//    case "L2":
//      return 0;
//    case "L1":
//      return 1;
//    case "1":
//      return 2;
//    case "2":
//      return 3;
//    case "3":
//      return 4;
//  }
//  console.error("No index for " + f);
//  return -1;
//}
//
//type mapCanvasProps = {
//  floor: number;
//  startLocation: string;
//};
//
//export function MapCanvas(props: mapCanvasProps) {
//  const [nodes, _setNodes] = useState<node[] | null>(null);
//  const [edges, _setEdges] = useState<edge[] | null>(null);
//  const nodesRef = useRef(nodes);
//  const edgesRef = useRef(edges);
//  const canvasRef = useRef<HTMLCanvasElement>(null);
//  const [selectedPoint, setSelectedPoint] = useState<vec2>({
//    x: -1,
//    y: -1,
//    z: props.floor,
//  });
//  const [vieweingFloor, setViewingFloor] = useState<number>(props.floor);
//  //const [mousePos, setMousePos] = useState({current:{x:0,y:0}, dragstart:{x:0,y:0}, down:false});
//  const [cameraControl, setCameraControl] = useState({
//    pan: { x: 0, y: 0 },
//    zoom: 1,
//  });
//
//  useEffect(() => {
//    window.addEventListener("wheel", handleZoom);
//    function handleZoom(e: WheelEvent) {
//      const velocity = e.deltaY;
//      let z = cameraControl.zoom + ZOOM_SPEED * velocity;
//      if (z >= ZOOM_MAX) z = ZOOM_MAX;
//      else if (z <= ZOOM_MIN) z = ZOOM_MIN;
//      setCameraControl({ ...cameraControl, zoom: z });
//      console.log(z);
//    }
//    return () => {
//      window.removeEventListener("wheel", handleZoom);
//    };
//  }, [cameraControl]);
//
//  useEffect(() => {
//    function handleMouseClicks(e: MouseEvent) {
//      const rect = canvasRef.current!.getBoundingClientRect(); // get element's abs. position
//      const x =
//        ((e.clientX - rect.left) / (rect.right - rect.left)) *
//        canvasRef.current!.width;
//      const y =
//        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
//        canvasRef.current!.height;
//
//      // Move point to nearest edge
//      if (nodesRef.current === null || edgesRef.current === null) return;
//      const coords = graphHelper({
//        pos: { x: x, y: y, z: vieweingFloor },
//        nodes: nodesRef.current,
//        edges: edgesRef.current,
//        floor: vieweingFloor,
//      });
//      if (coords === null) return;
//      setSelectedPoint({ x: coords.x, y: coords.y, z: vieweingFloor });
//    }
//    const cavel = canvasRef.current!;
//    console.log("cavan", cavel);
//    cavel.addEventListener("click", handleMouseClicks);
//
//    return () => cavel.removeEventListener("click", handleMouseClicks);
//  }, [vieweingFloor]);
//
//  function convertMapSpaceToCanvasSpace(p: vec2) {
//    return {
//      x: p.x * cameraControl.zoom,
//      y: p.y * cameraControl.zoom,
//      z: p.z,
//    };
//  }
//
//  // eslint-disable-next-line react-hooks/exhaustive-deps
//  function getPath(
//    startNode: string,
//    endNode: string,
//    endCoord: vec2 | null,
//    nodes: node[],
//    selFloor: number,
//  ) {
//    axios
//      .get("/api/astar-api?&startNode=" + startNode + "&endNode=" + endNode)
//      .then((res) => {
//        createPath(res.data.path, endCoord, nodes, selFloor);
//      });
//  }
//
//  function createPath(
//    nodeIDs: string[],
//    endCoord: vec2 | null,
//    nodes: node[],
//    selFloor: number,
//  ) {
//    const pathNodes: node[] = [];
//    for (const s of nodeIDs) {
//      const n = nodes.find((no: node) => {
//        return no.nodeID === s;
//      });
//      if (n === undefined) continue;
//      pathNodes.push(n);
//    }
//
//    if (pathNodes === undefined || pathNodes.length === 0) {
//      console.error("no path");
//      return;
//    }
//
//    const pathLength = pathNodes.length;
//    if (endCoord === null) {
//      for (let i = 0; i < nodes.length - 1; i++) {
//        drawLine(pathNodes[i].point, pathNodes[i + 1].point, selFloor);
//      }
//      return;
//    }
//    for (let i = 0; i < pathLength - 2; i++) {
//      drawLine(pathNodes[i].point, pathNodes[i + 1].point, selFloor);
//    }
//    if (
//      customPathHelper({ path: pathNodes, end: endCoord, nodes: nodes }) !=
//      pathNodes[pathLength - 2]
//    ) {
//      drawLine(
//        pathNodes[pathLength - 2].point,
//        pathNodes[pathLength - 1].point,
//        selFloor,
//      );
//      drawLine(pathNodes[pathLength - 1].point, endCoord, selFloor);
//    } else {
//      drawLine(pathNodes[pathLength - 2].point, endCoord, selFloor);
//    }
//  }
//
//  function drawLine(a: vec2, b: vec2, selectedFloor: number) {
//    const ctx = canvasRef.current!.getContext("2d")!;
//    if (a.z !== selectedFloor || b.z !== selectedFloor) return;
//    a = convertMapSpaceToCanvasSpace(a);
//    b = convertMapSpaceToCanvasSpace(b);
//    ctx.moveTo(a.x, a.y);
//    ctx.lineTo(b.x, b.y);
//    ctx.lineWidth = 5;
//    ctx.strokeStyle = "blue"; // Line color
//    ctx.lineCap = "round"; // Make ends of lines rounded
//    ctx.stroke(); // Draw line
//  }
//
//  function setNodes(nodes: node[]) {
//    nodesRef.current = nodes;
//    _setNodes(nodes);
//  }
//  function setEdges(edges: edge[]) {
//    edgesRef.current = edges;
//    _setEdges(edges);
//  }
//
//  const image = useMemo(() => {
//    const image: CanvasImageSource = new Image();
//    image.src = MAPS[vieweingFloor];
//    return image;
//  }, [vieweingFloor]);
//
//  useEffect(() => {
//    drawLoop();
//    function drawLoop() {
//      drawMapImage();
//    }
//    function drawMapImage() {
//      const ctx = canvasRef.current!.getContext("2d")!;
//      const w = canvasRef.current!.width;
//      const h = canvasRef.current!.height;
//      ctx.clearRect(0, 0, w, h);
//      image.onload = () => {
//        ctx.drawImage(
//          image,
//          0,
//          0,
//          w * cameraControl.zoom,
//          h * cameraControl.zoom,
//        );
//      };
//
//      console.log(cameraControl.zoom);
//    }
//  }, [cameraControl.zoom, image, vieweingFloor]);
//
//  // eslint-disable-next-line react-hooks/exhaustive-deps
//  function drawPoint(p: vec2) {
//    const ctx = canvasRef.current!.getContext("2d")!;
//    ctx.beginPath();
//    ctx.lineWidth = 15;
//    if (vieweingFloor === p.z) {
//      ctx.arc(p.x, p.y, 8, 0, 2 * Math.PI);
//    }
//    ctx.stroke();
//  }
//
//  // Init data
//  useEffect(() => {
//    axios.get("/api/map").then((res: AxiosResponse) => {
//      const ns: node[] = [];
//      const es: edge[] = [];
//
//      for (const r of res.data.nodes) {
//        const v: vec2 = {
//          x: r.xcoord,
//          y: r.ycoord,
//          z: FLOOR_NAME_TO_INDEX(r.floor),
//        };
//        const n: node = { nodeID: r.nodeID, point: v };
//        ns.push(n);
//      }
//
//      for (const r of res.data.edges) {
//        const start: node | undefined = ns.find((n: node) => {
//          return n.nodeID === r["startNodeID"];
//        });
//        if (start === undefined) continue;
//        const end: node | undefined = ns.find((n: node) => {
//          return n.nodeID === r["endNodeID"];
//        });
//        if (end === undefined) continue;
//        const e: edge = { startNode: start, endNode: end };
//        es.push(e);
//      }
//
//      setNodes(ns);
//      setEdges(es);
//    });
//  }, []);
//
//  useEffect(() => {
//    if (selectedPoint.x === -1 || selectedPoint.y === -1) {
//      return;
//    }
//
//    drawPoint(selectedPoint);
//
//    const closestNode = pointHelper({
//      pos: selectedPoint,
//      nodes: nodesRef.current!,
//      floor: vieweingFloor,
//    });
//    if (closestNode === null) return;
//
//    getPath(
//      closestNode.nodeID,
//      props.startLocation,
//      selectedPoint,
//      nodesRef.current!,
//      vieweingFloor,
//    );
//  }, [drawPoint, getPath, props.startLocation, selectedPoint, vieweingFloor]);
//
//  return (
//    <Box>
//      <canvas
//        width={2500}
//        height={1700}
//        style={{ width: "100%" }}
//        ref={canvasRef}
//      />
//      <Box>
//        <SpeedDial
//          ariaLabel="Map controls"
//          sx={{ position: "fixed", bottom: 16, right: 16 }}
//          icon={<PinDropIcon />}
//        >
//          <SpeedDialAction
//            key={"L2"}
//            icon={"L2"}
//            tooltipTitle={"Lower 2"}
//            onClick={() => {
//              setViewingFloor(0);
//            }}
//          />
//          <SpeedDialAction
//            key={"L1"}
//            icon={"L1"}
//            tooltipTitle={"Lower 1"}
//            onClick={() => {
//              setViewingFloor(1);
//            }}
//          />
//          <SpeedDialAction
//            key={"F1"}
//            icon={"F1"}
//            tooltipTitle={"Floor 1"}
//            onClick={() => {
//              setViewingFloor(2);
//            }}
//          />
//          <SpeedDialAction
//            key={"F2"}
//            icon={"F2"}
//            tooltipTitle={"Floor 2"}
//            onClick={() => {
//              setViewingFloor(3);
//            }}
//          />
//          <SpeedDialAction
//            key={"F3"}
//            icon={"F3"}
//            tooltipTitle={"Floor 3"}
//            onClick={() => {
//              setViewingFloor(4);
//            }}
//          />
//        </SpeedDial>
//      </Box>
//    </Box>
//  );
//}
//
//export default MapCanvas;
//
