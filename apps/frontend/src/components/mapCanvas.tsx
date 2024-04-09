import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  graphHelper,
  pointHelper,
  customPathHelper,
} from "../helpers/clickCorrectionMath.ts";
import { vec2, node, edge } from "../helpers/typestuff.ts";

import L0 from "../assets/BWHospitalMaps/00_thelowerlevel2.png";
import L1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
import L2 from "../assets/BWHospitalMaps/01_thefirstfloor.png";
import L3 from "../assets/BWHospitalMaps/02_thesecondfloor.png";
import L4 from "../assets/BWHospitalMaps/03_thethirdfloor.png";

import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";

const MAPS = [L0, L1, L2, L3, L4];

function FLOOR_NAME_TO_INDEX(f: string) {
  switch (f) {
    case "L2":
      return 0;
    case "L1":
      return 1;
    case "1":
      return 2;
    case "2":
      return 3;
    case "3":
      return 4;
  }
  console.error("No index for " + f);
  return -1;
}

type mapCanvasProps = {
  floor: number;
  startLocation: string;
};

function getPath(
  startNode: string,
  endNode: string,
  endCoord: vec2 | null,
  nodes: node[],
  ctx: CanvasRenderingContext2D,
  selFloor: number,
) {
  axios
    .get("/api/astar-api?&startNode=" + startNode + "&endNode=" + endNode)
    .then((res) => {
      createPath(res.data.path, endCoord, nodes, ctx, selFloor);
    });
}

function createPath(
  nodeIDs: string[],
  endCoord: vec2 | null,
  nodes: node[],
  ctx: CanvasRenderingContext2D,
  selFloor: number,
) {
  const pathNodes: node[] = [];
  for (const s of nodeIDs) {
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

  const pathLength = pathNodes.length;
  if (endCoord === null) {
    for (let i = 0; i < nodes.length - 1; i++) {
      drawLine(pathNodes[i].point, pathNodes[i + 1].point, ctx, selFloor);
    }
    return;
  }
  for (let i = 0; i < pathLength - 2; i++) {
    drawLine(pathNodes[i].point, pathNodes[i + 1].point, ctx, selFloor);
  }
  if (
    customPathHelper({ path: pathNodes, end: endCoord, nodes: nodes }) !=
    pathNodes[pathLength - 2]
  ) {
    drawLine(
      pathNodes[pathLength - 2].point,
      pathNodes[pathLength - 1].point,
      ctx,
      selFloor,
    );
    drawLine(pathNodes[pathLength - 1].point, endCoord, ctx, selFloor);
  } else {
    drawLine(pathNodes[pathLength - 2].point, endCoord, ctx, selFloor);
  }
}

function drawLine(
  a: vec2,
  b: vec2,
  ctx: CanvasRenderingContext2D,
  selectedFloor: number,
) {
  if (a.z !== selectedFloor || b.z !== selectedFloor) return;
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "blue"; // Line color
  ctx.lineCap = "round"; // Make ends of lines rounded
  ctx.stroke(); // Draw line
}

export function MapCanvas(props: mapCanvasProps) {
  const [nodes, _setNodes] = useState<node[] | null>(null);
  const [edges, _setEdges] = useState<edge[] | null>(null);
  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedPoint, setSelectedPoint] = useState<vec2>({
    x: -1,
    y: -1,
    z: props.floor,
  });
  const [vieweingFloor, setViewingFloor] = useState<number>(props.floor);

  function setNodes(nodes: node[]) {
    nodesRef.current = nodes;
    _setNodes(nodes);
  }
  function setEdges(edges: edge[]) {
    edgesRef.current = edges;
    _setEdges(edges);
  }

  useEffect(() => {
    axios.get("/api/map").then((res: AxiosResponse) => {
      const ns: node[] = [];
      const es: edge[] = [];

      const ss: string = "";
      for (const r of res.data.nodes) {
        const v: vec2 = {
          x: r.xcoord,
          y: r.ycoord,
          z: FLOOR_NAME_TO_INDEX(r.floor),
        };
        const n: node = { nodeID: r.nodeID, point: v };
        ns.push(n);
      }
      console.log(ss);

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
    console.log(props.startLocation);
    console.log("aaa");
    const canvasElement = canvasRef.current;
    if (canvasElement === null) {
      return;
    }

    const image: CanvasImageSource = new Image();
    image.src = MAPS[vieweingFloor];
    const context = canvasElement.getContext("2d");
    if (context === null) return;
    image.onload = () => {
      context.drawImage(image, 0, 0, canvasElement.width, canvasElement.height); // Change parameters to zoom in and pan around the image

      // Draw circle
      context.beginPath();
      context.lineWidth = 15;
      if (vieweingFloor === selectedPoint.z) {
        context.arc(selectedPoint.x, selectedPoint.y, 8, 0, 2 * Math.PI);
      }
      context.stroke();
      const closestNode = pointHelper({
        pos: selectedPoint,
        nodes: nodesRef.current!,
        floor: vieweingFloor,
      });
      if (closestNode === null) return;

      console.log(selectedPoint);

      getPath(
        closestNode,
        props.startLocation,
        selectedPoint,
        nodesRef.current!,
        context,
        vieweingFloor,
      );
    };

    function render(e: MouseEvent) {
      if (canvasElement === null || context === null) {
        console.error("canv null");
        return;
      }
      const rect = canvasElement.getBoundingClientRect(); // get element's abs. position
      const x =
        ((e.clientX - rect.left) / (rect.right - rect.left)) *
        canvasElement.width;
      const y =
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
        canvasElement.height;
      context.drawImage(image, 0, 0, canvasElement.width, canvasElement.height); // Change parameters to zoom in and pan around the image
      // Move point to nearest edge
      if (nodesRef.current === null || edgesRef.current === null) return;
      const coords = graphHelper({
        pos: { x: x, y: y, z: vieweingFloor },
        nodes: nodesRef.current,
        edges: edgesRef.current,
        floor: vieweingFloor,
      });
      if (coords === null) return;
      setSelectedPoint({ x: coords.x, y: coords.y, z: vieweingFloor });
    }
    canvasElement.addEventListener("click", render);

    return () => canvasElement.removeEventListener("click", render);
  });

  return (
    <>
      <canvas
        width={5000}
        height={3400}
        style={{ width: "100%" }}
        ref={canvasRef}
      />
      <Box>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            key={"L2"}
            icon={"L2"}
            tooltipTitle={"Lower 2"}
            onClick={() => {
              setViewingFloor(0);
            }}
          />
          <SpeedDialAction
            key={"L1"}
            icon={"L1"}
            tooltipTitle={"Lower 1"}
            onClick={() => {
              setViewingFloor(1);
            }}
          />
          <SpeedDialAction
            key={"F1"}
            icon={"F1"}
            tooltipTitle={"Floor 1"}
            onClick={() => {
              setViewingFloor(2);
            }}
          />
          <SpeedDialAction
            key={"F2"}
            icon={"F2"}
            tooltipTitle={"Floor 2"}
            onClick={() => {
              setViewingFloor(3);
            }}
          />
          <SpeedDialAction
            key={"F3"}
            icon={"F3"}
            tooltipTitle={"Floor 3"}
            onClick={() => {
              setViewingFloor(4);
            }}
          />
        </SpeedDial>
      </Box>
    </>
  );
}

export default MapCanvas;
//a
