import * as React from "react";

import styled from "styled-components";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const MapPage = () => {
  return (
    <>
      <GoogleMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <StyledBottomNav />
    </>
  );
};

export default MapPage;
