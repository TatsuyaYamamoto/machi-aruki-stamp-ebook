import * as React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import * as packageJson from "../../../package.json";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const OssLicenseDialog: React.FC<Props> = props => {
  const { open, handleClose } = props;
  const onItemClicked = (name: string) => () => {
    location.href = `https://www.npmjs.com/package/${name}`;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>OSS Licenses</DialogTitle>
      <DialogContent>
        <List>
          {Object.keys(packageJson.dependencies).map(name => (
            <ListItem key={name} button={true} onClick={onItemClicked(name)}>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OssLicenseDialog;
