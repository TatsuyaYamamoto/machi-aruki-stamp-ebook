import * as React from "react";

import {
  GoogleMap as ReactGoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const GoogleMap = withScriptjs(
  withGoogleMap(() => (
    <ReactGoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 35.1034305, lng: 138.8577255 }}
      defaultOptions={{
        fullscreenControl: false,
        zoomControl: false
      }}
    />
  ))
);

export default GoogleMap;
