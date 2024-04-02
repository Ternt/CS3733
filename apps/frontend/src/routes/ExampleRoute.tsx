import React from "react";
import { ExampleComponent } from "../components/ExampleComponent.tsx";
//import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function ExampleRoute() {
  // function handleChange() {
  //   console.log("changed ");
  // }

  //const age: number = 0;
  return (
    <div className="w-100">
      <h1>This is an example page.</h1>
      <ExampleComponent></ExampleComponent>

      <hr />
      {/*<FormControl fullWidth>*/}
      {/*  <InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
      {/*  <Select*/}
      {/*    labelId="demo-simple-select-label"*/}
      {/*    id="demo-simple-select"*/}
      {/*    value={age}*/}
      {/*    label="Age"*/}
      {/*    onChange={handleChange}*/}
      {/*  >*/}
      {/*    <MenuItem value={10}>Ten</MenuItem>*/}
      {/*    <MenuItem value={20}>Twenty</MenuItem>*/}
      {/*    <MenuItem value={30}>Thirty</MenuItem>*/}
      {/*  </Select>*/}
      {/*</FormControl>*/}
    </div>
  );
}
