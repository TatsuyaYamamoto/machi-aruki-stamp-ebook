import * as React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RestoreIcon from "@material-ui/icons/Restore";

class SimpleBottomNavigation extends React.Component {
  public state = {
    value: 0
  };

  public handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    this.setState({ value });
  };

  public render() {
    const { ...others } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels={true}
        {...others}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

export default SimpleBottomNavigation;
