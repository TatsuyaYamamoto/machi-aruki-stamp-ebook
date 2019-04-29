import * as React from "react";
const { useState, useEffect } = React;

import styled from "styled-components";
import LazyLoad from "react-lazyload";

import { firestore } from "firebase/app";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AppBar from "../organisms/AppBar";
import BottomNavigation from "../organisms/BottomNavigation";
import Drawer from "../organisms/Drawer";

import { Spot } from "../../domains/Spot";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StampPage = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [storeStamps, setStoreStamps] = useState<Spot[]>([]);
  useEffect(() => {
    Spot.getAll(firestore()).then(spots => {
      setStoreStamps(spots);
    });
  }, []);

  return (
    <>
      <AppBar onMenuClicked={handleDrawer} />
      <Drawer open={drawerOpen} handleClose={handleDrawer} />

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
      <StyledBottomNav />
    </>
  );
};

export default StampPage;
