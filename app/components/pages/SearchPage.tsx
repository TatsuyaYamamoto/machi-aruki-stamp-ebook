import * as React from "react";
const { useState, useEffect } = React;
import { RouteComponentProps } from "react-router-dom";

import LazyLoad from "react-lazyload";

import { firestore } from "firebase/app";

import Toolbar from "@material-ui/core/Toolbar";
import MuiAppBar from "@material-ui/core/AppBar/AppBar";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BackIcon from "@material-ui/icons/ArrowBack";

import SearchTextAppBar from "../organisms/SearchTextAppBar";

import { Spot } from "../../domains/Spot";

const StampPage: React.FC<RouteComponentProps> = props => {
  const handleBack = () => {
    props.history.goBack();
  };
  const [storeStamps, setStoreStamps] = useState<Spot[]>([]);
  useEffect(() => {
    Spot.getAll(firestore()).then(spots => {
      setStoreStamps(spots);
    });
  }, []);

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

      {storeStamps.map(s => {
        return (
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
        );
      })}
    </>
  );
};

export default StampPage;
