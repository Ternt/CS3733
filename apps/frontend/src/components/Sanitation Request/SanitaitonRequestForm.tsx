import { ChangeEvent, useState } from "react";
import PriorityDropdown from "./priorityDropdown.tsx";
import AssignmentDropdown from "./assignmentDropdown.tsx";
import { SanitationFormFields } from "./sanitationFields.ts";
import RequestList from "../../helpers/requestList.ts";

const sanitationRequests = new RequestList();

function SanitationRequestForm() {
  const [formInput, setFormInput] = useState<SanitationFormFields>({
    name: "",
    priority: "Low",
    location: "",
    type: "Unspecified",
    size: "Unspecified",
    assignmentStatus: "Unassigned",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, name: e.target.value });
  }

  function handleLocationInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, location: e.target.value });
  }

  function handleTypeInput() {
    // @ts-expect-error Specified type more specifically and typescript doesn't like that
    const boxes: NodeListOf<HTMLInputElement> =
      document.getElementsByName("type");
    let checkedBoxes = "";
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) {
        checkedBoxes += boxes[i].value + " ";
      }
    }
    setFormInput({ ...formInput, type: checkedBoxes });
  }

  function handleSizeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormInput({ ...formInput, size: e.target.value });
  }

  function submitForm() {
    sanitationRequests.addRequestToList(formInput);
    clearForm();
    console.log(sanitationRequests.requests); // Print the array of requests to the console
  }

  function clearForm() {
    setFormInput({
      ...formInput,
      name: "",
      priority: "Low",
      location: "",
      type: "Unspecified",
      size: "Unspecified",
      assignmentStatus: "Unassigned",
    });
    const form = document.getElementById("sanitationForm");
    if (form == null) {
      return;
    } else {
      // @ts-expect-error Declaring form as an HTMLFormElement causes errors with getting
      form.reset();
    }
  }

  return (
    <>
      <div className="santitationRequestDiv">
        <h2>Sanitation Service Request Form</h2>
        <form id="sanitationForm">
          <label>Your Name: </label>
          <input onChange={handleNameInput} value={formInput.name} />
          <br />
          <br />
          <PriorityDropdown
            onChange={(v: string) => {
              setFormInput({ ...formInput, priority: v });
            }}
          />
          <br />
          <br />
          <label>Location: </label>
          <input onChange={handleLocationInput} value={formInput.location} />
          <br />
          <br />
          <span id="checkboxes" onChange={handleTypeInput}>
            <label>Type of mess (Choose all that apply):</label>
            <br />
            <label>Solid waste</label>
            <input
              type="checkbox"
              id="solidspill"
              name="type"
              value="solidspill"
            />
            <br />
            <label>Liquid spill</label>
            <input
              type="checkbox"
              id="liquidspill"
              name="type"
              value="liquidspill"
            />
            <br />
            <label>Other</label>
            <input type="checkbox" id="other" name="type" value="other" />
            <br />
          </span>

          <br />
          <label>Mess Size</label>
          <br />
          <input
            name="messSize"
            type="radio"
            id="smallmess"
            onChange={handleSizeInput}
            value="small"
          />
          <label>Small&emsp;</label>
          <input
            name="messSize"
            type="radio"
            id="medmess"
            onChange={handleSizeInput}
            value="medium"
          />
          <label>Medium&emsp;</label>
          <input
            name="messSize"
            type="radio"
            id="bigmess"
            onChange={handleSizeInput}
            value="large"
          />
          <label>Large</label>

          <br />
          <br />
          <AssignmentDropdown
            onChange={(v: string) => {
              setFormInput({ ...formInput, assignmentStatus: v });
            }}
          />
          <br />
          <br />
          <button type="button" onClick={submitForm}>
            Submit Request
          </button>
          <br />
          <br />
          <button type="button" onClick={clearForm}>
            Clear
          </button>
        </form>
      </div>
    </>
  );
}

export default SanitationRequestForm;
