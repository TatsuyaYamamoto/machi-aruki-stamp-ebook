import * as React from "react";

import {
  GoogleMap as ReactGoogleMap,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const GoogleMap = withScriptjs(
  withGoogleMap(props => (
    <ReactGoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: 35.1034305, lng: 138.8577255 }}
      defaultOptions={{
        fullscreenControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        keyboardShortcuts: false
      }}
    >
      {props.children}
    </ReactGoogleMap>
  ))
);

export default GoogleMap;
