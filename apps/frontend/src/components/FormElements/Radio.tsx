import { ChangeEvent } from "react";

type checkboxProps = {
  label: string;
  onChange: (value: string) => void;
  groupName: string;
  items: string[];
};
function Radio(props: checkboxProps) {
  const radio = (
    <>
      {props.items.map((item) => {
        return (
          <span key={item}>
            <input type="radio" id={item} name={props.groupName} value={item} />
            <label>{item}&emsp;</label>
          </span>
        );
      })}
    </>
  );

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    props.onChange(e.target.value);
  }

  return (
    <span onChange={handleInput}>
      <label>{props.label} </label>
      <br />
      {radio}
    </span>
  );
}

export default Radio;
