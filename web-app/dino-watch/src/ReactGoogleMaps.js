import _ from "lodash";
import React from "react";
import GoogleMapReact from 'google-map-react';
import { apiKey } from './api'
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
      }
    };
  }

  onMapClick({ lat, lng }) {
    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng)
      this._googleMap.heatmap.data.push(point)
    }
  }

  render() {
    return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        ref={(el) => this._googleMap = el}
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={{ lat: 51.079998, lng: -114.130587 }}
        defaultZoom={20}
        heatmapLibrary={true}
        heatmap={this.state.heatMapData}
        onClick={this.onMapClick.bind(this)}>

      </GoogleMapReact>
      <button onClick={() => this.addNewPosition()}>Add a point</button>
    </div>
    )
  }
}

const enhance = _.identity;

const ReactGoogleMaps = () => [
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);