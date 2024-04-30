import * as React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import TranslateTo from "../../../helpers/multiLanguageSupport.ts";

import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

type PaymentFormProps = {
  cardDetails:{
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
  },
  onUpdateCardDetails: (  cardDetails:{
    cardHolderName: string;
    cardNumber: string;
    cvv: string;
    expirationDate: string;
  })=>void;
}

export default function PaymentForm(props:PaymentFormProps) {

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 3,
              height: { xs: 300, sm: 350, md: 375 },
              width: "100%",
              borderRadius: "20px",
              border: "1px solid ",
              borderColor: "divider",
              backgroundColor: "background.paper",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle2">{TranslateTo("credit.CC")}</Typography>
              <CreditCardRoundedIcon sx={{ color: "text.secondary" }} />
            </Box>
            <SimCardRoundedIcon
              sx={{
                fontSize: { xs: 48, sm: 56 },
                transform: "rotate(90deg)",
                color: "text.secondary",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-number" required>
                    {TranslateTo("credit.CNum")}
                </FormLabel>
                <OutlinedInput
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  required
                  value={props.cardDetails.cardNumber}
                  onChange={(e) => {
                      props.onUpdateCardDetails({...props.cardDetails, cardNumber: e.target.value});
                  }}
                />
              </FormGrid>
              <FormGrid sx={{ maxWidth: "20%" }}>
                <FormLabel htmlFor="cvv" required>
                    {TranslateTo("cvv")}
                </FormLabel>
                <OutlinedInput
                  id="cvv"
                  placeholder="123"
                  required
                  value={props.cardDetails.cvv}
                  onChange={(e) => {
                      props.onUpdateCardDetails({...props.cardDetails, cvv: e.target.value});
                  }}
                />
              </FormGrid>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-name" required>
                    {TranslateTo("name")}
                </FormLabel>
                <OutlinedInput
                  id="card-name"
                  placeholder="First Last"
                  value={props.cardDetails.cardHolderName}
                  onChange={(e) => {
                      props.onUpdateCardDetails({...props.cardDetails, cardHolderName: e.target.value});
                  }}
                  required
                />
              </FormGrid>
              <FormGrid sx={{ flexGrow: 1 }}>
                <FormLabel htmlFor="card-expiration" required>
                    {TranslateTo("expDate")}
                </FormLabel>
                <OutlinedInput
                  id="card-expiration"
                  placeholder="MM/YY"
                  required
                  value={props.cardDetails.expirationDate}
                  onChange={(e) => {
                      props.onUpdateCardDetails({...props.cardDetails, expirationDate: e.target.value});
                  }}
                />
              </FormGrid>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label={TranslateTo("credit.Rmbr")}
          />
        </Box>
    </Stack>
  );
}
