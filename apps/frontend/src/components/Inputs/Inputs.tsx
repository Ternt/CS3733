import "./Inputs.scss";
import React, { ReactNode, useState } from "react";

enum InputType {
  Blue = "blue",
  Gold = "gold",
}

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  type: InputType;
};
function Button(props: ButtonProps) {
  return (
    <button className={"button " + props.type} onClick={() => props.onClick()}>
      {props.children}
    </button>
  );
}

type TextInputProps = {
  onChange: (x: string) => void;
  type: InputType;
  placeholder: string;
  label: string;
};
function SmallTextInput(props: TextInputProps) {
  const [value, changeValue] = useState("");

  return (
    <div className={"small-text-wrapper"}>
      <p>{props.label}</p>
      <input
        type="text"
        className={"OSK font-p small-text " + props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          changeValue(e.target.value);
          props.onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          // @ts-expect-error value is valid
          changeValue(e.target.value);
          // @ts-expect-error value is valid
          props.onChange(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}
function LargeTextInput(props: TextInputProps) {
  const [value, changeValue] = useState("");

  return (
    <div className={"large-text-wrapper"}>
      <p>{props.label}</p>
      <textarea
        className={"OSK font-p large-text " + props.type}
        placeholder={props.placeholder}
        onChange={(e) => {
          changeValue(e.target.value);
          props.onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          // @ts-expect-error value is valid
          changeValue(e.target.value);
          // @ts-expect-error value is valid
          props.onChange(e.target.value);
        }}
        value={value}
      ></textarea>
    </div>
  );
}

type SelectionInputProps = {
  onChange: (x: string) => void;
  children: ReactNode;
  type: InputType;
  placeholder: string;
  label: string;
};

function SelectionInput(props: SelectionInputProps) {
  const [selection, changeSelection] = useState(props.placeholder);

  function selectItem(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target instanceof HTMLElement) {
      const x: string = e.target.innerHTML;
      changeSelection(x);
      props.onChange(x);
    }
  }

  return (
    <div className={"selection-wrapper"}>
      <div className={"font-p selection " + props.type}>
        <div className="head">{selection}</div>
        <div
          className="list"
          onClick={(e) => {
            selectItem(e);
          }}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

type SelectionInputItemProps = {
  children: ReactNode;
};
function SelectionInputItem(props: SelectionInputItemProps) {
  return (
    <div className={"font-p selection-item"}>
      <p>{props.children}</p>
    </div>
  );
}

export {
  InputType,
  Button,
  SmallTextInput,
  LargeTextInput,
  SelectionInput,
  SelectionInputItem,
};
