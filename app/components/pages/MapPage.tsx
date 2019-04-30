import * as React from "react";
import FC = React.FC;
const { useState, useEffect, useRef } = React;
import { RouteComponentProps } from "react-router-dom";

import { firestore } from "firebase/app";

import styled, { css, StyledProps } from "styled-components";

import MuiAppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";
import Fab from "../organisms/Fab";
import NewStampDialog from "../organisms/NewStampDialog";
import SearchTextAppBar from "../organisms/SearchTextAppBar";
import Drawer from "../organisms/Drawer";

import { Spot } from "../../domains/Spot";
import { MEMBERS } from "../../domains/Member";
import SpotFocus from "../organisms/SpotFocus";
import SpotMarker from "../atoms/SpotMarker";

const drawerWidth = 273; // TODO define clearly

interface MapContainerProps {
  open: boolean;
}

const MapContainer = styled.div`
  height: 100%;
  ${({ open, theme }: StyledProps<MapContainerProps>) =>
    open &&
    css`
      height: calc(100% - ${drawerWidth}px);
      transition: ${theme.transitions.create(["height"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })};
    `}
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

const MapPage: FC<RouteComponentProps> = props => {
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
  const mapElement = useRef(null);

  const onMarkerClicked = (s: Spot) => () => {
    setStampDetail(s);

    mapElement.current.panTo({
      lat: s.geopoint.latitude,
      lng: s.geopoint.longitude
    });
  };

  const closeStampDetailDrawer = () => {
    setStampDetail(null);
  };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const onSearchFieldFocused = () => {
    props.history.push(`/search`);
  };

  return (
    <>
      <>
        <MuiAppBar
          position="fixed"
          style={{ background: "transparent", boxShadow: "none" }}
        >
          <Toolbar>
            <SearchTextAppBar
              icon={<MenuIcon />}
              onIconClicked={handleDrawer}
              onFocused={onSearchFieldFocused}
            />
          </Toolbar>
        </MuiAppBar>
        <Drawer open={drawerOpen} handleClose={handleDrawer} />

        <MapContainer open={!!stampDetail}>
          <GoogleMap
            refObject={mapElement}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${`AIzaSyBTItNGmGoqu4JDuXgG7d6TOaJy8etAw-Y`}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          >
            {stampDetail ? (
              <SpotMarker
                latitude={stampDetail.geopoint.latitude}
                longitude={stampDetail.geopoint.longitude}
                color={MEMBERS[stampDetail.machiArukiStampInfo.member].color}
              />
            ) : (
              storeStamps.map(s => {
                const member = s.machiArukiStampInfo.member;
                const color = MEMBERS[member].color;

                return (
                  <SpotMarker
                    key={s.name}
                    latitude={s.geopoint.latitude}
                    longitude={s.geopoint.longitude}
                    color={color}
                    onClick={onMarkerClicked(s)}
                  />
                );
              })
            )}
          </GoogleMap>
        </MapContainer>
        {/* v0 app cannot create my spot.*/}
        {/*<StyledFab onClick={onNewStampRequested} />*/}
        {/*<StyledBottomNav />*/}
      </>

      {stampDetail && (
        <SpotFocus
          open={!!stampDetail}
          onClose={closeStampDetailDrawer}
          detail={{
            name: stampDetail.name,
            stampImageUrl: stampDetail.machiArukiStampInfo.stampImageUrl
          }}
        />
      )}

      <NewStampDialog
        open={openNewStampDialog}
        handleClose={handleCloseNewStampDialog}
      />
    </>
  );
};

export default MapPage;
