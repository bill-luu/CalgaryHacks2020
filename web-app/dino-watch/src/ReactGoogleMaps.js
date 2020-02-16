import _ from "lodash";
import React from "react";
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import { mapsApiKey } from './api'
import { withFirebase, FirebaseContext } from './firebase';

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
      // Push to client heat map
      const point = new google.maps.LatLng(lat, lng);
      this._googleMap.heatmap.data.push(point);

      // Push data to db
        let document = {
          lat: lat,
          lng: lng,
          timestamp: Math.round((new Date()).getTime() / 1000),
        }
      this.props.firebase.db.collection("hotLocations").add(document);
      this.canSendHeat = false;
    }
  }

  setHeatFlag() {
    this.canSendHeat = true;
  }
  componentDidMount() {
    this.props.firebase.hotLocations().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const point = new google.maps.LatLng(doc.data().lat, doc.data().lng)
          this._googleMap.heatmap.data.push(point)
      });
    });
  }

  render() {
    return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Button onClick={() => this.setHeatFlag()}>Add foot traffic</Button>
      <GoogleMapReact
        ref={(el) => this._googleMap = el}
        bootstrapURLKeys={{ key: mapsApiKey }}
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
  <FirebaseContext.Consumer>
    {firebase => <MyMapComponent key="map" firebase={firebase} />}
  </FirebaseContext.Consumer>

];

export default withFirebase(enhance(ReactGoogleMaps));