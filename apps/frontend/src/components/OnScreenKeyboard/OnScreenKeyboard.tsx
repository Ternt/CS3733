import "./OnScreenKeyboard.scss";
import { useState } from "react";

type OnScreenKeyboardProps = {
  selectedInputField: HTMLElement | null;
};

export default function OnScreenKeyboard(props: OnScreenKeyboardProps) {
  const [shifted, setShifted] = useState(true);

  function handleKeystroke(c: string) {
    if (
      props.selectedInputField instanceof HTMLInputElement ||
      props.selectedInputField instanceof HTMLTextAreaElement
    ) {
      props.selectedInputField.focus();

      switch (c.toLowerCase()) {
        case "del":
          props.selectedInputField.value =
            props.selectedInputField.value.substring(
              0,
              props.selectedInputField.value.length - 1,
            );
          break;
        case "enter":
          props.selectedInputField.value += "\n";
          break;
        case "shift":
          setShifted(!shifted);
          break;
        case "hide":
          props.selectedInputField.blur();
          break;
        case "<":
          if (
            props.selectedInputField.selectionStart !== null &&
            props.selectedInputField.selectionStart > 0
          )
            props.selectedInputField.setSelectionRange(
              props.selectedInputField.selectionStart - 1,
              props.selectedInputField.selectionStart - 1,
            );
          break;
        case ">":
          if (
            props.selectedInputField.selectionStart !== null &&
            props.selectedInputField.selectionStart <
              props.selectedInputField.value.length
          )
            props.selectedInputField.setSelectionRange(
              props.selectedInputField.selectionStart + 1,
              props.selectedInputField.selectionStart + 1,
            );
          break;
        case "___":
          props.selectedInputField.value += " ";
          break;
        default:
          if (shifted) {
            props.selectedInputField.value += c.toUpperCase();
            setShifted(false);
          } else {
            props.selectedInputField.value += c.toLowerCase();
          }
          break;
      }

      props.selectedInputField.dispatchEvent(
        new Event("keydown", { bubbles: true, cancelable: true }),
      );
    }
  }

  if (props.selectedInputField === null) {
    return <></>;
  }
  return (
    <div
      className={"keyboard-wrapper"}
      onFocus={(event) => {
        event.stopPropagation();
      }}
      onClick={(event) => {
        event.stopPropagation();
        handleKeystroke("");
      }}
    >
      <div className={"on-screen-keyboard"}>
        <div className={"row"}>
          <Keycap
            keycap={"Eng"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"1"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"2"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"3"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"4"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"5"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"6"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"7"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"8"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"9"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"0"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"Del"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
        </div>
        <div className={"row"}>
          <Keycap
            keycap={"$%^"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"Q"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"W"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"E"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"R"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"T"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"Y"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"U"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"I"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"O"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"P"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <SpacerKey />
          <Keycap
            keycap={"Enter"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
        </div>
        <div className={"row"}>
          <Keycap
            keycap={"A'"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"A"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"S"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"D"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"F"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"G"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"H"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"J"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"K"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"L"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"?"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"Hide"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
        </div>
        <div className={"row"}>
          <Keycap
            keycap={"Shift"}
            width={2}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"@"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"Z"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"X"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"C"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"V"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"B"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"N"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={"M"}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={shifted}
          />
          <Keycap
            keycap={","}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={"."}
            width={1}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <SpacerKey />
          <Keycap
            keycap={"<"}
            width={0.9}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
          <Keycap
            keycap={">"}
            width={0.9}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
        </div>
        <div className={"row"}>
          <Keycap
            keycap={"___"}
            width={11}
            onSendKey={(c: string) => {
              handleKeystroke(c);
            }}
            shift={false}
          />
        </div>
      </div>
    </div>
  );
}

type KeycapProps = {
  keycap: string;
  width: number;
  onSendKey: (c: string) => void;
  shift: boolean;
};

function Keycap(props: KeycapProps) {
  return (
    <div
      className={"key"}
      style={{ width: props.width * 3 + "rem" }}
      onClick={() => {
        props.onSendKey(props.keycap);
      }}
    >
      {props.shift ? props.keycap.toUpperCase() : props.keycap.toLowerCase()}
    </div>
  );
}

function SpacerKey() {
  return <div className={"spacer"}></div>;
}
