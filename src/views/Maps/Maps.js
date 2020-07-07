import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { useState } from 'react';
import Axios from 'axios';



function getLats(){
  return Axios.get('http://localhost:8000/api/action/latlnglist',{
  }).then(response =>{
    
    console.log(response);
    this.setState({latlngs:response.data});
  }).catch(errors => {
    console.log(errors)
});
}





const CustomSkinMap = withScriptjs(
  
  
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 36.806496, lng: 10.181532 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true,
        styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      }}
    >
      <Marker position={{ lat: 36.806496, lng: 10.181532 }} />
      <Marker position={{ lat: 36.778150, lng: 10.111460 }} />
      <Marker position={{ lat: 36.883270, lng: 10.324450 }} />

      <InfoWindow 
             maxWidth= '20px '         
             visible={true} position={{lat:36.806496 , lng:10.181532}} >
               <div>
               <h2>Recyclage de vetements en jean.</h2>
               <p>Avez-vous des vetements en jean dont vous n'avez plus besoin ? Emmenez les à cette adresse! </p>
              
               </div>
      </InfoWindow>

      <InfoWindow 
             maxWidth= '20px '         
             visible={true} position={{lat:36.778150 , lng:10.111460}} >
               <div>
               <h2>Don de sang.</h2>
               <p>Combattons ensemble toutes les menaces qui planent sur le malade en l'absence de sang en temps opportun </p>
              
               </div>
      </InfoWindow>

      <InfoWindow 
             maxWidth= '20px '         
             visible={true} position={{lat:36.883270 , lng:10.324450}} >
               <div>
               <h2>Recyclage de bouteilles</h2>
               <p>Emmenez vos bouteilles en plastique et aidez des jeunes artisans à créer des meubles. </p>
              
               </div>
      </InfoWindow>
     
    </GoogleMap>
  ))
);

export default function Maps() {
  return (
    <CustomSkinMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBa7iaXmn9zAdEaOFfmQAcK6dlz5nfQ3X8"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}
