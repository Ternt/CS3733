import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { RequestCard } from "./ServiceRequestOverview";

type RequestInspectionDialogueProps = {
  selectedRequest:RequestCard | null;
  onCloseDialogue:()=>void;
}

export function RequestInspectionDialogue(props:RequestInspectionDialogueProps) {

  return (
    <Dialog
      open={props.selectedRequest !== null}
      onClose={props.onCloseDialogue}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="email"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCloseDialogue}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
