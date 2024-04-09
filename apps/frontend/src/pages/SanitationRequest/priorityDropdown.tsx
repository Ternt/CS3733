import { ChangeEvent } from "react";

type dropdownProps = {
  onChange: (value: string) => void;
};

function PriorityDropdown(props: dropdownProps) {
  /**
   * Update the selected location based on the dropdown option
   * @param e The dropdown element that changed
   */
  function handlePriorityInput(e: ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <>
      <label>Priority: </label>
      <select defaultValue="Unspecified" onChange={handlePriorityInput}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Emergency">Emergency</option>
      </select>
    </>
  );
}

export default PriorityDropdown;
