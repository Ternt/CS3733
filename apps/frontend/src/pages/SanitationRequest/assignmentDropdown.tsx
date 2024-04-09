import { ChangeEvent } from "react";

type dropdownProps = {
  onChange: (value: string) => void;
};
function AssignmentDropdown(props: dropdownProps) {
  /**
   * Update the selected location based on the dropdown option
   * @param e The dropdown element that changed
   */
  function handleAssignmentInput(e: ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <>
      <label>Request Status: </label>
      <select defaultValue="Unassigned" onChange={handleAssignmentInput}>
        <option value="Unassigned">Unassigned</option>
        <option value="Assigned">Assigned</option>
        <option value="InProgress">In Progress</option>
        <option value="Closed">Closed</option>
      </select>
    </>
  );
}

export default AssignmentDropdown;
