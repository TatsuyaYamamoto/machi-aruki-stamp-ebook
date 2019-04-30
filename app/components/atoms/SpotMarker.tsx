import * as React from "react";
import { Marker } from "react-google-maps";

interface Props {
  color: string;
  latitude: number;
  longitude: number;
  onClick?: () => void;
}

const svg = (color: string) => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px">
        <path d="M39,19c0,11-15,25-15,25S9,30,9,19a15,15,0,0,1,30,0Z" fill="${color}" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        <circle cx="24" cy="19" r="5" fill="${"#ffffff"}" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
    </svg>`;

const SpotMarker: React.FC<Props> = props => {
  const { latitude, longitude, color, onClick } = props;

  return (
    <Marker
      position={{
        lat: latitude,
        lng: longitude
      }}
      // TODO create as component and check pin location whether it shifts from original marker.
      icon={{
        url: `data:image/svg+xml;charset=UTF-8;base64,${btoa(svg(color))}`
      }}
      onClick={onClick}
    />
  );
};

export default SpotMarker;
