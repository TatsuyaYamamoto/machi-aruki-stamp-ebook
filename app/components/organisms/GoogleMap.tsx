import * as React from "react";

import {
  GoogleMap as ReactGoogleMap,
  GoogleMapProps,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import * as mapStyleJson from "../../google-map-style.json";
import MapTypeStyle = google.maps.MapTypeStyle;

const GoogleMap = withScriptjs(
  withGoogleMap<GoogleMapProps>(props => {
    let mapProps: GoogleMapProps = {};
    if (props.center) {
      mapProps = {
        ...mapProps,
        center: props.center
      };
    }

    return (
      <ReactGoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 35.1034305, lng: 138.8577255 }}
        defaultOptions={{
          fullscreenControl: false,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          keyboardShortcuts: false,
          styles: mapStyleJson as MapTypeStyle[]
        }}
        {...mapProps}
      >
        {props.children}
      </ReactGoogleMap>
    );
  })
);

export default GoogleMap;
