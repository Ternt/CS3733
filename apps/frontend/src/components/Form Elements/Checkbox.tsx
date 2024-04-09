import { ChangeEvent } from "react";

type checkboxProps = {
  label: string;
  onChange: (value: string) => void;
  groupName: string;
  items: string[];
};
function Checkbox(props: checkboxProps) {
  const checkbox = (
    <>
      {props.items.map((item) => {
        return (
          <span key={item}>
            <input
              type="checkbox"
              id={item}
              name={props.groupName}
              value={item}
            />
            <label>{item}</label>
            <br />
          </span>
        );
      })}
    </>
  );

  function handleInput(e: ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <span onChange={handleInput}>
      <label>{props.label} </label>
      <br />
      {checkbox}
    </span>
  );
}

export default Checkbox;
