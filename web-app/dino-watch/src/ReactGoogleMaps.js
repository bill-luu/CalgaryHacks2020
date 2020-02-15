import _ from "lodash";
import React from "react";
import GoogleMapReact from 'google-map-react';
import { apiKey } from './api'

const test = {
  positions: [
    { lat: 51.079998, lng: -114.130587 },
    { lat: 51.079998, lng: -114.130587 },
  ],
  options: {
    radius: 80,
    opacity: 0.6
  }
}

const MyMapComponent = () => (
  <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: apiKey }}
      defaultCenter={{ lat: 51.079998, lng: -114.130587}}
      defaultZoom={20}
      heatmapLibrary={true}
      heatmap={test}>
    </GoogleMapReact>
  </div>
)

const enhance = _.identity;

const ReactGoogleMaps = () => [
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);