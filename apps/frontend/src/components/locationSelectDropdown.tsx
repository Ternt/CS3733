import { ChangeEvent } from "react";

type dropdownProps = {
  onChange: (value: string) => void;
};

function LocationSelectDropdown(props: dropdownProps) {
  /**
   * Update the selected location based on the dropdown option
   * @param e The dropdown element that changed
   */
  function handleLocationInput(e: ChangeEvent<HTMLSelectElement>) {
    props.onChange(e.target.value);
  }

  return (
    <>
      <div className="form">
        <label>Start/Kiosk Location: </label>
        <select
          defaultValue="CCNF001L1"
          name="languages"
          id="lang"
          onChange={handleLocationInput}
        >
          <option value="CCONF001L1">Anesthesia Conf Floor L1</option>
          <option value="CCONF003L1">Abrams Conference Room</option>
          <option value="CCONF002L1">
            {" "}
            Medical Records Conference Room Floor L1{" "}
          </option>
          <option value="CHALL007L1">Hallway 7 Floor L1</option>
          <option value="CHALL014L1">Hallway 14 Floor L1</option>
          <option value="CHALL015L1">Hallway 15 Floor L1</option>
          <option value="CLABS001L1">Outpatient Fluoroscopy Floor L1</option>
          <option value="CLABS002L1">Pre-Op PACU Floor L1</option>
          <option value="CLABS003L1">Nuclear Medicine Floor L1</option>
          <option value="CLABS004L1">Ultrasound Floor L1</option>
          <option value="CLABS005L1">CSIR MRI Floor L1</option>
          <option value="CREST001L1">Restroom L Elevator Floor L1</option>
          <option value="CREST002L1">Restroom M Elevator Floor L1</option>
          <option value="CREST003L1">Restroom K Elevator Floor L1</option>
          <option value="CREST004L1">Restroom H Elevator Floor L1</option>
          <option value="CRETL001L1">Vending Machine 1 L1</option>
          <option value="GELEV00QL1">Elevator Q MapNode 7 Floor L1</option>
          <option value="CSERV001L1">Volunteers Floor L1</option>
          <option value="GEXIT001L1">
            {" "}
            Fenwood Road Exit MapNode 1 Floor L1{" "}
          </option>
          <option value="GHALL002L1">Hallway MapNode 2 Floor L1</option>
          <option value="GHALL003L1">Hallway MapNode 3 Floor L1</option>
          <option value="GHALL004L1">Hallway MapNode 4 Floor L1</option>
          <option value="GHALL005L1">Hallway MapNode 5 Floor L1</option>
          <option value="GHALL006L1">Hallway MapNode 6 Floor L1</option>
          <option value="GSTAI008L1">Stairs MapNode 8 Floor L1</option>
          <option value="WELEV00HL1">Elevator H Floor L1</option>
          <option value="WELEV00JL1">Elevator J Floor L1</option>
          <option value="WELEV00KL1">Elevator K Floor L1</option>
          <option value="WELEV00LL1">Elevator L Floor L1</option>
          <option value="WELEV00ML1">Elevator M Floor L1</option>
          <option value="CDEPT002L1">
            {" "}
            Day Surgery Family Waiting Floor L1{" "}
          </option>
          <option value="CDEPT003L1">
            {" "}
            Day Surgery Family Waiting Exit Floor L1{" "}
          </option>
          <option value="CHALL002L1">Hallway 2 Floor L1</option>
          <option value="CHALL001L1">Hallway 1 Floor L1</option>
          <option value="CDEPT004L1">
            {" "}
            Medical Records Film Library Floor L1{" "}
          </option>
          <option value="CHALL005L1">Hallway 5 Floor L1</option>
          <option value="CHALL004L1">Hallway 4 Floor L1</option>
          <option value="CHALL003L1">Hallway 3 Floor L1</option>
          <option value="CHALL006L1">Hallway 6 Floor L1</option>
          <option value="CHALL009L1">Hallway 9 Floor L1</option>
          <option value="CHALL010L1">Hallway 10 Floor L1</option>
          <option value="CHALL008L1">Hallway 8 Floor L1</option>
          <option value="CHALL011L1">Hallway 11 Floor L1</option>
          <option value="CHALL013L1">Hallway 13 Floor L1</option>
          <option value="CHALL012L1">Hallway 12 Floor L1</option>
        </select>
      </div>
    </>
  );
}

export default LocationSelectDropdown;
