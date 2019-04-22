import * as React from "react";
const { useState, useMemo } = React;

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Stamp } from "../../domains/Stamp";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const NewStampDialog: React.FC<Props> = props => {
  const { open, handleClose, ...others } = props;
  const [form, setForm] = useState({
    name: "",
    note: "",
    date: new Date()
  });

  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setForm({
      ...form,
      name: newValue
    });
  };

  const onNoteChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setForm({
      ...form,
      note: newValue
    });
  };

  const onOkClicked = async () => {
    await Stamp.create(form.name, form.date, form.note);

    handleClose();
  };

  const canSubmit = useMemo(() => {
    return !!form.name;
  }, [form]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>新しいスタンプを登録します！</DialogTitle>
        <DialogContent>
          <DialogContentText />
          <TextField
            margin="dense"
            label="Name"
            value={form.name}
            fullWidth={true}
            onChange={onNameChanged}
          />
          <TextField
            margin="dense"
            label="Date"
            value={form.date.toDateString()}
            fullWidth={true}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            margin="dense"
            label="Note"
            value={form.note}
            fullWidth={true}
            multiline={true}
            onChange={onNoteChanged}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onOkClicked} color="primary" disabled={!canSubmit}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewStampDialog;
