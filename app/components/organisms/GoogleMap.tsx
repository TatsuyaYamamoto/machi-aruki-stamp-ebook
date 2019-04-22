import * as React from "react";

import {
  GoogleMap as ReactGoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const GoogleMap = withScriptjs(
  withGoogleMap(() => (
    <ReactGoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    />
  ))
);

export default GoogleMap;
