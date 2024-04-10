import { ChangeEvent } from "react";

type dropdownProps = {
  label: string;
  onChange: (value: string) => void;
  items: string[];
  defaultValue: string;
};
function Dropdown(props: dropdownProps) {
  const dropdown = (
    <select defaultValue={props.defaultValue} onChange={handleInput}>
      {props.items.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })}
    </select>
  );

  function handleInput(e: ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <>
      <label>{props.label} </label>
      {dropdown}
    </>
  );
}

export default Dropdown;
