import { useRef, useEffect } from "react";
import axios from "axios";

type mapCanvasProps = {
  image: typeof Image;
};

export function MapCanvas(props: mapCanvasProps) {
  const canvasRef = useRef(null);

  /**
   * Draw a path between several nodes
   * @param nodes Array of node ids in order of connection
   */
  function createPath(nodes: string[]) {
    for (let i = 0; i < nodes.length - 1; i++) {
      connectNodes(nodes[i], nodes[i + 1]);
    }
  }

  /**
   * Create a line between two valid nodes when passing their nodeID as a string
   * @param startNodeStr The nodeID of the starting node
   * @param endNodeStr The nodeID of the ending node
   */
  async function connectNodes(startNodeStr: string, endNodeStr: string) {
    let startNode: object, endNode: object;
    await axios.get("/api/map").then((res) => {
      startNode = res.data.nodes.filter((node) => node.nodeID == startNodeStr);
      endNode = res.data.nodes.filter((node) => node.nodeID == endNodeStr);
    });
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

  useEffect(() => {
    const image = new Image();
    image.src = props.image;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    image.onload = () => {
      context.drawImage(image, 0, 0, 5000, 3400); // Change parameters to zoom in and pan around the image
      createPath(["CHALL004L1", "CLABS005L1", "CREST002L1"]); // Hardcoded path for now.
    };
  });

  return (
    <>
      <canvas ref={canvasRef} width={5000} height={3400} />
    </>
  );
}

export default MapCanvas;
