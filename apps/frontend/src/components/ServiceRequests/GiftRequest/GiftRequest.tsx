import * as React from "react";
import ActionAreaCard from "../../Card/ActionAreaCard.tsx";
import Grid from "@mui/material/Grid";

const flowersOffered: string[] = ["roses", "tulips"];

function GiftRequest() {
  return (
    <>
      <Grid
        container
        direction={"row"}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        {flowersOffered.map((flower) => (
          <ActionAreaCard title={flower} />
        ))}
      </Grid>
    </>
  );
}

export default GiftRequest;
