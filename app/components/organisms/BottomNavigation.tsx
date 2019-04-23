import * as React from "react";
const { useState } = React;
import { withRouter, RouteComponentProps } from "react-router-dom";

import MuiBottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import MapIcon from "@material-ui/icons/Map";
import DoneIcon from "@material-ui/icons/Done";
import StoreIcon from "@material-ui/icons/Store";

const toPath = (index: number): string => {
  if (index === 0) {
    return "/map";
  }
  if (index === 1) {
    return "/store";
  }
  if (index === 2) {
    return "/stamp";
  }
};

const toIndex = (path: string): number => {
  if (path.startsWith("/map")) {
    return 0;
  }
  if (path.startsWith("/store")) {
    return 1;
  }
  if (path.startsWith("/stamp")) {
    return 2;
  }

  throw new Error(`unexpected path is handled. path: ${path}`);
};

const BottomNavigation: React.FC<RouteComponentProps> = props => {
  const { history, location, match, staticContext, ...others } = props;
  const currentPath = location.pathname;

  const [navIndex, setNavIndex] = useState(toIndex(currentPath));

  const onNavChanged = (event: React.ChangeEvent<{}>, newNavIndex: number) => {
    if (newNavIndex !== navIndex) {
      const path = toPath(newNavIndex);
      history.push(path);
    }

    setNavIndex(newNavIndex);
  };

  return (
    <MuiBottomNavigation
      value={navIndex}
      onChange={onNavChanged}
      showLabels={true}
      {...others}
    >
      <BottomNavigationAction label="Map" icon={<MapIcon />} />
      <BottomNavigationAction label="Store" icon={<StoreIcon />} />
      <BottomNavigationAction label="Stamp" icon={<DoneIcon />} />
    </MuiBottomNavigation>
  );
};

export default withRouter(BottomNavigation);
