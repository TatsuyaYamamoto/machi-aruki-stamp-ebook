import * as React from "react";

import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const AppBar = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const onMenuClicked = () => {
    setOpenDrawer(true);
  };

  const onMenuClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={onMenuClicked}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      <Drawer anchor="left" open={openDrawer} onClose={onMenuClose}>
        <List>
          <ListItem button={true}>
            <ListItemText primary={"Menu"} />
          </ListItem>
          <ListItem button={true}>
            <ListItemText primary={"Setting"} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default AppBar;
