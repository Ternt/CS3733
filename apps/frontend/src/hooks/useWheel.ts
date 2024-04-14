import {useEffect, useState} from "react";
import {clamp} from "../helpers/MapHelper.ts";

export default function useWheel(init:number, min:number, max:number, setter:(zoom:number)=>void){
  const [delta, setDelta] = useState(0);
  const [cumm ,setCumm] = useState(init);

  useEffect(() => {
    window.addEventListener("wheel", handleZoom);
    function handleZoom(e: WheelEvent) {
      const d = Math.sign(e.deltaY) + (Math.random()/10000000);
      setDelta(d);
      setCumm(clamp(cumm + (d*0.05), min, max));
      setter(clamp(cumm + (d*0.05), min, max));
      setTimeout(()=>{setDelta(0);},1);
    }
    return () => {
      window.removeEventListener("wheel", handleZoom);
    };
  }, [cumm, max, min, setter]);

  return delta;
}