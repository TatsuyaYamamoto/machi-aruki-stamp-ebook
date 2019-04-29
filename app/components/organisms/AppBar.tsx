import * as React from "react";

import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

interface Props {
  onMenuClicked: () => void;
}

const AppBar: React.FC<Props> = props => {
  const { onMenuClicked } = props;

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={onMenuClicked}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
