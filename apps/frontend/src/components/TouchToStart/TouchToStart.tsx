import "./TouchToStart.scss";
import MatIcon from "../MatIcon/MatIcon.tsx";
import { useEffect, useState } from "react";

function TouchToStart() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(true);

  const DELAY_MS: number = 3000;
  const LANGUAGES: string[] = [
    "Touch to Begin",
    "Zum Starten berühren",
    "Toca para comenzar",
    "点击开始",
    "Cliquez pour commencer",
    "クリックして始めましょう",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (index >= LANGUAGES.length) setIndex(0);
      else setIndex(index + 1);
    }, DELAY_MS);

    return () => clearInterval(interval);
  }, [LANGUAGES.length, index]);

  return (
    <>
      <div
        className={"touch-to-start " + (display ? "show" : "hide")}
        onClick={() => setDisplay(false)}
      >
        <div className="touch-icon">
          <MatIcon icon={"touch_app"} color={""} />
        </div>
        <h1 className="language-text">{LANGUAGES[index]}</h1>
      </div>
    </>
  );
}

export default TouchToStart;
