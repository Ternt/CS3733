import React, { useEffect, useMemo, useRef, useState } from "react";

import L0 from "../assets/BWHospitalMaps/00_thelowerlevel2.png";
import L1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
import L2 from "../assets/BWHospitalMaps/01_thefirstfloor.png";
import L3 from "../assets/BWHospitalMaps/02_thesecondfloor.png";
import L4 from "../assets/BWHospitalMaps/03_thethirdfloor.png";

import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import { edge, node, vec2 } from "../helpers/typestuff.ts";
import axios, { AxiosResponse } from "axios";
//import {edge, node} from "../helpers/typestuff.ts";

const MAPS = [L0, L1, L2, L3, L4];
const ZOOM_SPEED = 0.05;
const ZOOM_MAX = 1;
const ZOOM_MIN = 0.5;
const BASE_MAP_WIDTH = 5000;
const BASE_MAP_HEIGHT = 3400;
const MAP_WIDTH = 1920;
const MAP_HEIGHT = (BASE_MAP_HEIGHT / BASE_MAP_WIDTH) * MAP_WIDTH;
const X_MULT = MAP_WIDTH / BASE_MAP_WIDTH;
const Y_MULT = MAP_HEIGHT / BASE_MAP_HEIGHT;

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
  defaultFloor: number;
  startLocation: string;
};

export function MapCanvas(props: mapCanvasProps) {
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
    zoom: 1,
  });
  const [renderData, setRenderData] = useState<{ n: node[]; e: edge[] }>({
    n: [],
    e: [],
  });

  // canvas data
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const image = useMemo(() => {
    const image: CanvasImageSource = new Image();
    image.src = MAPS[viewingFloor];
    return image;
  }, [viewingFloor]);

  function handleSetViewingFloor(i: number) {
    // update the render data
    setRenderData({
      n: nodes.filter((n: node) => n.point.z === viewingFloor),
      e: edges.filter((e: edge) => e.startNode.point.z === viewingFloor),
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
        0,
        0,
        canv.width / cameraControl.zoom,
        canv.height / cameraControl.zoom,
      );

      function vecToCanvSpace(a: vec2) {
        return {
          x: (a.x / cameraControl.zoom) * X_MULT,
          y: (a.y / cameraControl.zoom) * Y_MULT,
          z: a.z,
        };
      }

      function drawPoint(p: vec2) {
        p = vecToCanvSpace(p);
        ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
      }

      function drawLine(a: vec2, b: vec2) {
        a = vecToCanvSpace(a);
        b = vecToCanvSpace(b);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }

      for (const n of renderData.n) {
        ctx.lineWidth = 15;
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
      console.log("draw");
    }
    image.onload = () => {
      canvasDraw();
    };
    canvasDraw();
  }, [cameraControl.zoom, image, renderData.e, renderData.n]);

  // input handling
  useEffect(() => {
    window.addEventListener("wheel", handleZoom);
    function handleZoom(e: WheelEvent) {
      const velocity = Math.sign(e.deltaY);
      let z = cameraControl.zoom + ZOOM_SPEED * velocity; // TODO maybe make addToZOmm of whateve an outside funct so no deps
      if (z >= ZOOM_MAX) z = ZOOM_MAX;
      else if (z <= ZOOM_MIN) z = ZOOM_MIN;
      setCameraControl({ ...cameraControl, zoom: z });
    }
    return () => {
      window.removeEventListener("wheel", handleZoom);
    };
  }, [cameraControl]);

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
        pos: { x: x, y: y },
        downPos: mouseData.down ? { x: x, y: y } : mouseData.downPos,
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseData]);

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    function handleMouseDown() {
      setMouseData({ ...mouseData, down: true });
    }

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mouseData]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    function handleMouseUp() {
      setMouseData({ ...mouseData, down: false });
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
        const n: node = { nodeID: r.nodeID, point: v };
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

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "80vh",
      }}
    >
      <canvas
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{ width: "100%" }}
        ref={canvasRef}
      />
      <Box>
        <SpeedDial
          ariaLabel="Map controls"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
          icon={<PinDropIcon />}
        >
          <SpeedDialAction
            key={"L2"}
            icon={"L2"}
            tooltipTitle={"Lower 2"}
            onClick={() => {
              handleSetViewingFloor(0);
            }}
          />
          <SpeedDialAction
            key={"L1"}
            icon={"L1"}
            tooltipTitle={"Lower 1"}
            onClick={() => {
              handleSetViewingFloor(1);
            }}
          />
          <SpeedDialAction
            key={"F1"}
            icon={"F1"}
            tooltipTitle={"Floor 1"}
            onClick={() => {
              handleSetViewingFloor(2);
            }}
          />
          <SpeedDialAction
            key={"F2"}
            icon={"F2"}
            tooltipTitle={"Floor 2"}
            onClick={() => {
              handleSetViewingFloor(3);
            }}
          />
          <SpeedDialAction
            key={"F3"}
            icon={"F3"}
            tooltipTitle={"Floor 3"}
            onClick={() => {
              handleSetViewingFloor(4);
            }}
          />
        </SpeedDial>
      </Box>
    </Box>
  );
}

export default MapCanvas;
