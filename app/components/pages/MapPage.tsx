import * as React from "react";

import styled from "styled-components";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";
import AppBar from "../organisms/AppBar";

const MapContainer = styled.div`
  // TODO load '56px' of bottom nav and '64px' app bar height from material-ui theme
  height: calc(100% - (64px + 56px));
`;

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const MapPage = () => {
  return (
    <>
      <AppBar />
      <MapContainer>
        <GoogleMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </MapContainer>
      <StyledBottomNav />
    </>
  );
};

export default MapPage;
