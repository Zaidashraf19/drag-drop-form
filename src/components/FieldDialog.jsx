import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const DialogComponent = ({
  open,
  onClose,
  onSubmit,
  editDiv,
  state,
  setState,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <TextField
            required
            margin="dense"
            label="Label"
            fullWidth
            value={state?.label}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                label: e.target.value,
              }))
            }
          />
          {["RadioButton", "DropDown"].includes(state?.type) && (
            <TextField
              multiline
              rows={4}
              required
              margin="dense"
              label="Options (one per line)"
              fullWidth
              value={state?.options}
              onChange={(e) =>
                setState((prev) => ({
                  ...prev,
                  options: e.target.value,
                }))
              }
            />
          )}
          <DialogActions>
            <Button type="submit">
              {editDiv != null ? "Create" : "Update"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
