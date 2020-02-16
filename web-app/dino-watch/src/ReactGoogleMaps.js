import _ from "lodash";
import React from "react";
import GoogleMapReact from 'google-map-react';
import Button from '@material-ui/core/Button';
import { mapsApiKey } from './api'
import { withFirebase, FirebaseContext } from './firebase';

/* global google */

class MyMapComponent extends React.Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    
    this.props.firebase.hotLocations().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const point = new google.maps.LatLng(doc.data().lat, doc.data().lng)
          this._googleMap.heatmap.data.push(point)
         
      });
    }).then(() => {
      var currentTime = new Date();
      console.log(currentTime.getHours())
      if(currentTime.getHours() >= 9 && currentTime.getHours() <= 16) {
        const scienceBPoint1 = new google.maps.LatLng({lat: 51.078750, lng: -114.129242})
        const scienceBPoint2 = new google.maps.LatLng({lat: 51.078986, lng: -114.129894})
        const scienceBPoint3 = new google.maps.LatLng({lat: 51.078986, lng: -114.129894})
        const scienceBPoint4 = new google.maps.LatLng({lat: 51.078986, lng: -114.129894})
        const scienceBPoint5 = new google.maps.LatLng({lat: 51.078986, lng: -114.129894})
          
        const mathSciencePoint1 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
        const mathSciencePoint2 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
        const mathSciencePoint3 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
        const mathSciencePoint4 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})

        const ICTPoint1 = new google.maps.LatLng({lat: 51.079994, lng: -114.129836})
        const ICTPoint2 = new google.maps.LatLng({lat: 51.079995, lng: -114.129836})
        const ICTPoint3 = new google.maps.LatLng({lat: 51.079996, lng: -114.129836})
        const ICTPoint4 = new google.maps.LatLng({lat: 51.079995, lng: -114.129833})
        
        this._googleMap.heatmap.data.push(scienceBPoint1)
        this._googleMap.heatmap.data.push(scienceBPoint2)
        this._googleMap.heatmap.data.push(scienceBPoint3)
        this._googleMap.heatmap.data.push(scienceBPoint4)
        this._googleMap.heatmap.data.push(scienceBPoint5)
        this._googleMap.heatmap.data.push(mathSciencePoint1)
        this._googleMap.heatmap.data.push(mathSciencePoint2)
        this._googleMap.heatmap.data.push(mathSciencePoint3)
        this._googleMap.heatmap.data.push(mathSciencePoint4)
        this._googleMap.heatmap.data.push(ICTPoint1)
        this._googleMap.heatmap.data.push(ICTPoint2)
        this._googleMap.heatmap.data.push(ICTPoint3)
        this._googleMap.heatmap.data.push(ICTPoint4)
      }
    }
    );
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