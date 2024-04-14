import { ChangeEvent } from "react";
import { Checkbox, FormLabel, Box, FormControlLabel } from "@mui/material";

type checkboxProps = {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  items: string[];
  checked: string[];
};

function convertToDBFormat(text: string) {
    text = text.toUpperCase();
    text = text.replace(" ", "_");
    return text;
}

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
              id={convertToDBFormat(item)}
              checked={props.checked.includes(convertToDBFormat(item))}
              onChange={(e) => {
                props.onChange(e);
              }}
              sx={{paddingLeft: 0, paddingRight: 1, paddingY: 1}}
            />
          }
          label={item}
          sx={{margin: 0}}
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
