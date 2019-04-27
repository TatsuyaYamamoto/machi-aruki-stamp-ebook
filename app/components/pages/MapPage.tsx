import * as React from "react";
import FC = React.FC;
const { useState, useEffect } = React;

import { firestore } from "firebase/app";
import { Marker } from "react-google-maps";

import styled from "styled-components";

import Drawer from "@material-ui/core/Drawer";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";
import AppBar from "../organisms/AppBar";
import Fab from "../organisms/Fab";
import NewStampDialog from "../organisms/NewStampDialog";

import { Spot } from "../../domains/Spot";
import { MEMBERS } from "../../domains/Member";

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
              const member = s.machiArukiStampInfo.member;
              const color = MEMBERS[member].color;
              const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px">
                    <path d="M39,19c0,11-15,25-15,25S9,30,9,19a15,15,0,0,1,30,0Z" fill="${color}" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <circle cx="24" cy="19" r="5" fill="${"#ffffff"}" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </svg>`;

              return (
                <Marker
                  key={s.name}
                  position={{
                    lat: s.geopoint.latitude,
                    lng: s.geopoint.longitude
                  }}
                  // TODO create as component and check pin location whether it shifts from original marker.
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8;base64,${btoa(svg)}`
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
