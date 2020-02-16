import _ from "lodash";
import React from "react";
import GoogleMapReact from 'google-map-react';
import { apiKey } from './api'
import Button from '@material-ui/core/Button';
/* global google */

class MyMapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      heatMapData: {
        positions: [
        ],
        options: {
          radius: 60,
          opacity: 0.5,
          maxIntensity: 5,
          dissipating: true,
        }
      },
      canSendHeat: false,
    };
  }

  onMapClick({ lat, lng }) {
    if (!this.canSendHeat) {
      return;
    }

    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng)
      this._googleMap.heatmap.data.push(point)
      this.canSendHeat = false;
    }
  }

  setHeatFlag() {
    this.canSendHeat = true;
  }

  render() {
    return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Button onClick={() => this.setHeatFlag()}>Add foot traffic</Button>
      <GoogleMapReact
        ref={(el) => this._googleMap = el}
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 51.07800, lng: -114.132148 }}
        defaultZoom={16}
        heatmapLibrary={true}
        heatmap={this.state.heatMapData}
        onClick={this.onMapClick.bind(this)}>
      </GoogleMapReact>
    </div>
    )
  }
}

const enhance = _.identity;

const ReactGoogleMaps = () => [
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);