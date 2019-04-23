import * as React from "react";
import FC = React.FC;
const { useState, useEffect } = React;

import styled from "styled-components";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";
import AppBar from "../organisms/AppBar";
import Fab from "../organisms/Fab";
import NewStampDialog from "../organisms/NewStampDialog";
import { StoreStamp } from "../../domains/StoreStamp";
import { Marker } from "react-google-maps";

const MapContainer = styled.div`
  // TODO load '56px' of bottom nav and '64px' app bar height from material-ui theme
  height: calc(100% - (64px + 56px));
`;

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const StyledFab = styled(Fab)`
  margin: 0;
  top: auto;
  right: 20px;
  bottom: 70px;
  left: auto;
  position: fixed;
`;

const MapPage: FC = () => {
  const [openNewStampDialog, setOpenNewStampDialog] = useState(false);
  const onNewStampRequested = () => {
    setOpenNewStampDialog(true);
  };
  const handleCloseNewStampDialog = () => {
    setOpenNewStampDialog(false);
  };

  const [storeStamps, setStoreStamps] = useState<StoreStamp[]>([]);
  useEffect(() => {
    // TODO share docs of store page
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

  const [stampDetail, setStampDetail] = useState<StoreStamp>(null);

  const onMarkerClicked = (s: StoreStamp) => () => {
    setStampDetail(s);
  };

  const closeStampDetailDrawer = () => {
    setStampDetail(null);
  };

  return (
    <>
      <>
        <AppBar />
        <MapContainer>
          <GoogleMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${`AIzaSyBTItNGmGoqu4JDuXgG7d6TOaJy8etAw-Y`}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            {storeStamps.map(s => {
              return (
                <Marker
                  key={s.stampNumber}
                  position={{
                    lat: s.geopoint.latitude,
                    lng: s.geopoint.longitude
                  }}
                  onClick={onMarkerClicked(s)}
                />
              );
            })}
          </GoogleMap>
        </MapContainer>
        <StyledFab onClick={onNewStampRequested} />
        <StyledBottomNav />
      </>

      <Drawer
        anchor="right"
        open={!!stampDetail}
        onClose={closeStampDetailDrawer}
      >
        {!!stampDetail && (
          <div style={{ width: 300 }}>
            <div>{stampDetail.name}</div>
            <img width={200} height={200} src={stampDetail.imageUrl} />
            <div>{stampDetail.description}</div>
          </div>
        )}
      </Drawer>

      <NewStampDialog
        open={openNewStampDialog}
        handleClose={handleCloseNewStampDialog}
      />
    </>
  );
};

export default MapPage;
