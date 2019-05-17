import * as React from "react";
const { useState, useEffect } = React;
import { RouteComponentProps } from "react-router-dom";

import LazyLoad from "react-lazyload";

import Toolbar from "@material-ui/core/Toolbar";
import MuiAppBar from "@material-ui/core/AppBar/AppBar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BackIcon from "@material-ui/icons/ArrowBack";

import SearchTextAppBar from "../organisms/SearchTextAppBar";
import { SpotContextConsumer } from "../utils/SpotProvider";

const StampPage: React.FC<RouteComponentProps> = props => {
  const handleBack = () => {
    props.history.goBack();
  };

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <SearchTextAppBar
            icon={<BackIcon />}
            onIconClicked={handleBack}
            onFocused={() => {}}
            autoFocus={true}
          />
        </Toolbar>
      </MuiAppBar>

      <SpotContextConsumer>
        {({ spots }) =>
          spots.map(s => (
            <ExpansionPanel key={s.name}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{s.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <LazyLoad>
                  <img src={s.machiArukiStampInfo.stampImageUrl} />
                </LazyLoad>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))
        }
      </SpotContextConsumer>
    </>
  );
};

export default StampPage;
