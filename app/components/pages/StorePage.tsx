import * as React from "react";
const { useState, useEffect } = React;

import styled from "styled-components";
import LazyLoad from "react-lazyload";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AppBar from "../organisms/AppBar";
import BottomNavigation from "../organisms/BottomNavigation";

import { StoreStamp } from "../../domains/StoreStamp";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StampPage = () => {
  const [storeStamps, setStoreStamps] = useState<StoreStamp[]>([]);
  useEffect(() => {
    StoreStamp.getAll().then(stamps => {
      setStoreStamps(
        stamps.sort((a, b) => {
          if (a.stampNumber < b.stampNumber) return 1;
          if (a.stampNumber > b.stampNumber) return -1;
          return 0;
        })
      );
    });
  }, []);

  return (
    <>
      <AppBar />
      {storeStamps.map(s => {
        return (
          <ExpansionPanel key={s.stampNumber}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{s.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <LazyLoad>
                <img src={s.imageUrl} />
              </LazyLoad>
              <Typography>{s.description}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
      <StyledBottomNav />
    </>
  );
};

export default StampPage;
