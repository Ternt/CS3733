import { ChangeEvent, useState } from "react";
import { SanitationFormFields } from "./sanitationFields.ts";
import RequestList from "../../helpers/requestList.ts";
import Dropdown from "../Form Elements/Dropdown.tsx";
import Checkbox from "../Form Elements/Checkbox.tsx";
import Radio from "../Form Elements/Radio.tsx";

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

  function updateSizeInput(input: string) {
    setFormInput({ ...formInput, size: input });
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

          <Dropdown
            label={"Priority:"}
            onChange={(v: string) => {
              setFormInput({ ...formInput, assignmentStatus: v });
            }}
            items={["Low", "Medium", "High", "Emergency"]}
            defaultValue={"Low"}
          />

          <label>Location: </label>
          <input onChange={handleLocationInput} value={formInput.location} />

          <Checkbox
            label={"Type of mess (Choose all that apply):"}
            onChange={handleTypeInput}
            groupName={"type"}
            items={["Solid Waste", "Liquid Spill", "Other"]}
          />

          <Radio
            label={"Mess Size"}
            onChange={updateSizeInput}
            groupName={"messSize"}
            items={["Small", "Medium", "Large"]}
          />

          <Dropdown
            label={"Assignment Status:"}
            onChange={(v: string) => {
              setFormInput({ ...formInput, assignmentStatus: v });
            }}
            items={["Unassigned", "Assigned", "In Progress", "Closed"]}
            defaultValue={"Unassigned"}
          />
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
