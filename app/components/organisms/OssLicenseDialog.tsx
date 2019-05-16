import * as React from "react";

import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";

import licenses from "../../../public/assets/licenses.txt";

const Transition = (props: any) => {
  return <Slide direction="up" {...props} />;
};

const AppBarSpace = styled.div`
  flex-grow: 1;
`;

const CloseButton = styled(IconButton as React.FC<IconButtonProps>)`
  flex: 1;
`;

const Content = styled.pre`
  white-space: pre-line;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const OssLicenseDialog: React.FC<Props> = props => {
  const { open, handleClose } = props;

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position={"relative"}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            OSS Licenses
          </Typography>
          <AppBarSpace />
          <CloseButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Content>{licenses}</Content>
      </DialogContent>
    </Dialog>
  );
};

export default OssLicenseDialog;
