import * as React from "react";

import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import AppBar, { AppBarProps } from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const Transition = (props: any) => {
  return <Slide direction="up" {...props} />;
};

const StyledAppBar = styled(AppBar as React.FC<AppBarProps>)`
  position: relative;
`;

const AppBarSpace = styled.div`
  flex-grow: 1;
`;
const CloseButton = styled(IconButton as React.FC<IconButtonProps>)`
  flex: 1;
`;

interface Props {
  open: boolean;
  handleClose: () => void;
}

const GuideDialog: React.FC<Props> = props => {
  const { open, handleClose } = props;

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Guide
          </Typography>
          <AppBarSpace />
          <CloseButton color="inherit" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
        </Toolbar>
      </StyledAppBar>
      <Typography>なにこれ？</Typography>
      <Typography>なにこれ？</Typography>
      <Typography>なにこれ？</Typography>
      <Typography>なにこれ？</Typography>
    </Dialog>
  );
};

export default GuideDialog;
