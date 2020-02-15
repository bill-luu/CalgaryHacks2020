import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { apiKey } from './constants'
//import GitHubForkRibbon from "react-github-fork-ribbon";
//import Header from "../../Header";
const heatmapData = [
  // new google.maps.LatLng(51.080031, -114.447),
  // new google.maps.LatLng(51.080031, -114.445),
  // new google.maps.LatLng(51.080031, -114.443),
  // new google.maps.LatLng(51.080031, -114.441),
  // new google.maps.LatLng(51.080031, -114.439),
  // new google.maps.LatLng(51.080031, -114.437),
  // new google.maps.LatLng(51.080031, -114.435),
  // new google.maps.LatLng(51.100031, -114.447),
  // new google.maps.LatLng(51.100031, -114.445),
  // new google.maps.LatLng(51.100031, -114.443),
  // new google.maps.LatLng(51.100031, -114.441),
  // new google.maps.LatLng(51.100031, -114.439),
  // new google.maps.LatLng(51.100031, -114.437),
  // new google.maps.LatLng(51.100031, -114.435)
  {positions:{
    lat: 51.079998,
    long: -114.130587
  }},
  {positions:{
    lat: 51.079998,
    long: -114.130587
  }},
  {positions:{
    lat: 51.079998,
    long: -114.130587
  }},
  {positions:{
    lat: 51.079998,
    long: -114.130587
  }},
  {positions:{
    lat: 51.079998,
    long: -114.130587
  }}
];

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&v=3.exp&libraries=geometry,drawing,places,visualization",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={20} defaultCenter={{ lat: 51.079998, lng: -114.130587}} heatmapLibrary={true}
    heatmap={{heatmapData}}>
    <Marker position={{ lat: 51.08, lng: -114.130587 }} />
  </GoogleMap>
));


const enhance = _.identity;

const ReactGoogleMaps = () => [
  // <Header key="header" />,
  // <GitHubForkRibbon
  //   key="ribbon"
  //   href="https://github.com/tomchentw/react-google-maps"
  //   target="_blank"
  //   rel="noopener noreferrer"
  //   position="right"
  // >
  //   Fork me on GitHub
  // </GitHubForkRibbon>,
  <MyMapComponent key="map" />
];

export default enhance(ReactGoogleMaps);