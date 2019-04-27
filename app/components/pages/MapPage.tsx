import * as React from "react";
import FC = React.FC;
const { useState, useEffect } = React;

import { firestore } from "firebase/app";

import styled from "styled-components";

import Drawer from "@material-ui/core/Drawer";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";
import AppBar from "../organisms/AppBar";
import Fab from "../organisms/Fab";
import NewStampDialog from "../organisms/NewStampDialog";
import { Spot } from "../../domains/Spot";
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

  const [storeStamps, setStoreStamps] = useState<Spot[]>([]);
  useEffect(() => {
    // TODO share docs of store page
    Spot.getAll(firestore()).then(spots => {
      setStoreStamps(spots);
    });
  }, []);

  const [stampDetail, setStampDetail] = useState<Spot>(null);

  const onMarkerClicked = (s: Spot) => () => {
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
                  key={s.name}
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
        {/* TODO */}
        {!!stampDetail && (
          <div style={{ width: 300 }}>
            <div>{stampDetail.name}</div>
            <img
              width={200}
              height={200}
              src={stampDetail.machiArukiStampInfo.stampImageUrl}
            />
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
