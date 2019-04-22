import * as React from "react";

import styled from "styled-components";

import GoogleMap from "../organisms/GoogleMap";
import BottomNavigation from "../organisms/BottomNavigation";

const MapContainer = styled.div`
  // TODO load '56px' of bottom nav height from material-ui theme
  height: calc(100% - 56px);
`;

const StyledBottomNav = styled(BottomNavigation)`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const MapPage = () => {
  return (
    <>
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
