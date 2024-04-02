import { useRef, useEffect } from "react";
import axios from "axios";
import {graphHelper, pointHelper} from "../helpers/clickCorrectionMath.ts";
import {vec2} from "../helpers/vec2.ts";

let startLocation = "CCONF001L1"; // Default location to start pathfinding from

type mapCanvasProps = {
  image: typeof Image;
};

export function updateMapLoc(newLoc : string) {
    startLocation = newLoc;
}

export function MapCanvas(props: mapCanvasProps) {
  const canvasRef = useRef(null);
  let nodes, edges;
  let pathDrawn: boolean = false;
  updateMapPaths();

    /**
     * Update the nodes and edges from the database through an API call. Used increase program efficiency
     */
  async function updateMapPaths() {
    await axios.get("/api/map").then((res) => {
      nodes = res.data.nodes;
      edges = res.data.edges;
    });
  }

    /**
     * Make an API call to determine the path between two nodes.
     * @param startNode The nodeID of the starting node
     * @param endNode The nodeID of the ending node
     * @param endCoord The XY coordinate of a selected point, if desired
     */
  async function getPath(
    startNode: string,
    endNode: string,
    endCoord: vec2 | null = null,
  ) {
    await axios
      .get("/api/astar-api?startNode=" + startNode + "&endNode=" + endNode)
      .then((res) => {
        createPath(res.data.path, endCoord);
        console.log(res.data.path);
      });
  }

  /**
   * Draw a path between several nodes
   * @param nodes Array of node ids in order of connection
   */
  function createPath(nodes: string[], endCoord: vec2 | null = null) {
    //console.log(nodes);
    if (endCoord != null) {
      for (let i = 0; i < nodes.length - 2; i++) {
        connectNodes(nodes[i], nodes[i + 1]); // TODO: Make path go through points when there's only two points in a path and selected point is through that point
      }
      connectNodeToPoint(nodes[nodes.length - 2], endCoord);
    } else {
      for (let i = 0; i < nodes.length - 1; i++) {
        connectNodes(nodes[i], nodes[i + 1]);
      }
    }
  }

  /**
   * Create a line between two valid nodes when passing their nodeID as a string
   * @param startNodeStr The nodeID of the starting node
   * @param endNodeStr The nodeID of the ending node
   */
  async function connectNodes(startNodeStr: string, endNodeStr: string) {
    const startNode = nodes.filter((node) => node.nodeID == startNodeStr);
    const endNode = nodes.filter((node) => node.nodeID == endNodeStr);
    if (startNode !== undefined && endNode !== undefined) {
      drawLine(
        startNode[0].xcoord,
        startNode[0].ycoord,
        endNode[0].xcoord,
        endNode[0].ycoord,
      );
    }
  }

    /**
     * Draw a line between a known node and a specified coordinate
     * @param startNodeStr The nodeID of the starting node
     * @param endCoord The XY coordinate of the ending point
     */
  async function connectNodeToPoint(startNodeStr: string, endCoord: vec2) {
    let startNode: object;
    await axios.get("/api/map").then((res) => {
      startNode = res.data.nodes.filter((node) => node.nodeID == startNodeStr);
    });
    if (startNode !== undefined) {
      drawLine(
        startNode[0].xcoord,
        startNode[0].ycoord,
        endCoord.x,
        endCoord.y,
      );
    }
  }

  /**
   * Draw a line on the canvas between the specified positions
   * @param startX X-coordinate of the start point
   * @param startY Y-coordinate of the start point
   * @param endX X-coordinate of the end point
   * @param endY Y-coordinate of the end point
   */
  function drawLine(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
  ) {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.moveTo(startX, startY); // Start position
    context.lineTo(endX, endY);
    context.lineWidth = 5;
    context.strokeStyle = "blue"; // Line color
    context.lineCap = "round"; // Make ends of lines rounded
    context.stroke(); // Draw line
  }

    /**
     * Reset the canvas so only the map is showing (no drawn paths)
     * @param canvas The canvas element to clear
     * @param ctx The context of the desired canvas element
     * @param rect The edgebound rectangle for the canvas
     * @param image The image to display on the canvas
     */
  function resetCanvas(canvas, ctx: CanvasRenderingContext2D, rect, image) {
    ctx.clearRect(rect.left, rect.top, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, 5000, 3400); // Change parameters to zoom in and pan around the image
  }

  useEffect(() => {
    const image = new Image();
    image.src = props.image;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.addEventListener("click", function (e) {
      const rect = canvas.getBoundingClientRect(); // get element's abs. position
      const x =
        ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width;
      const y =
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height;

      if (pathDrawn) {
        resetCanvas(canvas, context, rect, image);
      }

      // Move point to nearest edge
      try {
        const coords = graphHelper({ x, y, nodes, edges });
        // Draw circle
        context.beginPath();
        context.lineWidth = 15;
        context.arc(coords.x, coords.y, 5, 0, 2 * Math.PI);
        context.stroke();

        const closestNode = pointHelper({ x: coords.x, y: coords.y, nodes });
            // console.log("Passed Loc: " + startLocation);
            getPath(closestNode, startLocation, coords);
      } catch (TypeError) {
        console.log("Selected point too far from any path");
      }
    });
    image.onload = () => {
      context.drawImage(image, 0, 0, 5000, 3400); // Change parameters to zoom in and pan around the image
    };
  });
  pathDrawn = true;

  return (
    <>
      <canvas ref={canvasRef} width={5000} height={3400} />
    </>
  );
}

export default MapCanvas;
