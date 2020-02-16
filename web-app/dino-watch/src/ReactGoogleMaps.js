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
    this.props.firebase.hotLocations().get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const point = new google.maps.LatLng(doc.data().lat, doc.data().lng)
          // Check timestamp of each doc against current time
          let timestamp = doc.data().timestamp
          let now = Math.round((new Date()).getTime() / 1000)
          // If ts > 15min, delete doc from db
          if (now - timestamp > 900) {
            const id = doc.id
            this.props.firebase.hotLocations().doc(id.toString()).delete() // Delete document
          }
          else {
            this._googleMap.heatmap.data.push(point)
          }
        });

        this.props.firebase.hotLocations().onSnapshot((querySnapshot) => {
          let newData = []
          querySnapshot.forEach((doc) => {
            const point = new google.maps.LatLng(doc.data().lat, doc.data().lng)
            newData.push(point)
          })
          this._googleMap.heatmap.setData(newData)

          var currentTime = new Date();
          // If day is Sat && time is after 9am, or if day is Sun && time is before 4pm (6pm in case demos go long)
          if( ((currentTime.getDay() === 7) && (currentTime.getHours() >= 9 && currentTime.getHours() <= 24))
            || (currentTime.getDay() === 0) && (currentTime.getHours() >= 0 && currentTime.getHours() <= 16))
          {
              const MacHallPoint1 = new google.maps.LatLng({lat: 51.078418, lng: -114.131066})
              const MacHallPoint2 = new google.maps.LatLng({lat: 51.078418, lng: -114.131065})
              const MacHallPoint3 = new google.maps.LatLng({lat: 51.078418, lng: -114.131066})
              const MacHallPoint4 = new google.maps.LatLng({lat: 51.078415, lng: -114.131066})
              const MacHallPoint5 = new google.maps.LatLng({lat: 51.078415, lng: -114.131069})

              const mathSciencePoint1 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
              const mathSciencePoint2 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
              const mathSciencePoint3 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})
              const mathSciencePoint4 = new google.maps.LatLng({lat: 51.079960, lng: -114.127964})

              const ICTPoint1 = new google.maps.LatLng({lat: 51.079994, lng: -114.129836})
              const ICTPoint2 = new google.maps.LatLng({lat: 51.079995, lng: -114.129836})
              const ICTPoint3 = new google.maps.LatLng({lat: 51.079996, lng: -114.129836})
              const ICTPoint4 = new google.maps.LatLng({lat: 51.079995, lng: -114.129833})

              this._googleMap.heatmap.data.push(MacHallPoint1)
              this._googleMap.heatmap.data.push(MacHallPoint2)
              this._googleMap.heatmap.data.push(MacHallPoint3)
              this._googleMap.heatmap.data.push(MacHallPoint4)
              this._googleMap.heatmap.data.push(MacHallPoint5)
              this._googleMap.heatmap.data.push(mathSciencePoint1)
              this._googleMap.heatmap.data.push(mathSciencePoint2)
              this._googleMap.heatmap.data.push(mathSciencePoint3)
              this._googleMap.heatmap.data.push(mathSciencePoint4)
              this._googleMap.heatmap.data.push(ICTPoint1)
              this._googleMap.heatmap.data.push(ICTPoint2)
              this._googleMap.heatmap.data.push(ICTPoint3)
              this._googleMap.heatmap.data.push(ICTPoint4)
          }
        })
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