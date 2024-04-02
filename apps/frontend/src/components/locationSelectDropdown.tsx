import {ChangeEvent} from "react";

type dropdownProps = {
    //outsideVar
    outsideVarSetter
}

function LocationSelectDropdown(props: dropdownProps) {
    /**
     * Update the selected location based on the dropdown option
     * @param e The dropdown element that changed
     */
    function handleLocationInput(e: ChangeEvent<HTMLSelectElement>) {
        props.outsideVarSetter(e.target.value);
    }
    return (
        <>
            <div className="form">
                <label>Start/Kiosk Location: </label>
                <select defaultValue="CC)NF001L1" name="languages" id="lang" onChange={handleLocationInput}>
                    <option value="CCONF001L1">Default</option>
                    <option value="WELEV00HL1">H Elevators</option>
                    <option value="WELEV00JL1">Elevator J</option>
                    <option value="WELEV00KL1">Elevator K</option>
                    <option value="WELEV00LL1">L Elevators</option>
                    <option value="CDEPT003L1">Waiting Area</option>
                    <option value="WELEV00ML1">Elevator M</option>
                    <option value="WELEV00QL1">Elevator Q</option>
                </select>
            </div>
        </>
    );
}

export default LocationSelectDropdown;
