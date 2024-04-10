import { ChangeEvent } from "react";
import { Checkbox, FormLabel, Box, FormControlLabel } from "@mui/material";

type checkboxProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  items: string[];
  checked: string[];
};

function Checkboxes(props: checkboxProps) {
  const checkbox = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "top",
      }}
    >
      {props.items.map((item: string) => (
        <FormControlLabel
          key={item}
          control={
            <Checkbox
              id={item}
              checked={props.checked.includes(item)}
              onChange={(e) => {
                props.onChange(e);
              }}
            />
          }
          label={item}
        />
      ))}
    </Box>
  );

  return (
    <>
      <FormLabel>{props.label}</FormLabel>
      {checkbox}
    </>
  );
}

export default Checkboxes;
