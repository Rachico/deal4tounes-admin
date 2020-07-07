import React, {Component} from "react";
import '../css/style.css';

import Action from './Action.js';
import CommentGroup from './Comments/CommentGroup.js';
import MapStyles from './MapStyles.js';
import Axios from 'axios';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



 
export class Localisation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        latlngs:[],
      
        
        
    };
  }
    

      
      
      
      componentDidMount(){

        //get action title and body from lat&lng
        // get action lat&lng
        
        
          // get action lat&lng
          Axios.get('http://localhost:8000/api/action/latlnglist',{
      }).then(response =>{
        
        console.log(response);
        this.setState({latlngs:response.data});
      }).catch(errors => {
        console.log(errors)
  });

 

}
     
onMarkerClick = (props, marker, e) =>
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
});
     
      
     
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };


  render() {
    
    return (
    
      <div id="Espace_actions">
    <center>
    <h2 className='f1' style={{fontFamily:"Open Sans",color:"black", marginTop:'20px'}}>Actions</h2>
    <h3 style={{ fontFamily:"Open Sans"}}>Cliquez sur les pins afin de consulter les actions</h3>
    <div style={{width : '80vw' , height: '80vh', marginBottom:'40px', marginTop:'40px'}}>

      <Map style = {{
        width: '80vw',
        height: '80vh'
      }} google={this.props.google} zoom={12} initialCenter={{
        lat: 36.806496,
        lng: 10.181532
    }}
    onClick={this.onMapClicked}
      >
   {      
           this.state.latlngs.map(latlngs=>{
             return <Marker onClick={this.onMarkerClick} position={{lat: latlngs.lat, lng:latlngs.lng}} />
              })
          }  
               
               { this.state.latlngs.map(latlngs=>{ 
                 console.log(latlngs.lat);
                 console.log(latlngs.lng);
                 console.log(latlngs.title);  
            return <InfoWindow 
             maxWidth= '20px '         
             visible={this.state.showingInfoWindow} onCloseClick={this.onMapClicked} position={{lat: latlngs.lat, lng:latlngs.lng}} >
               <div>
               <h2>{latlngs.title}</h2>
               <p>{latlngs.body}</p>
               
              
                
               </div>
           </InfoWindow>})
  }
           
          
        

      
      </Map>
      
      </div>
      </center>
      <Action />
      
      </div>
    
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBa7iaXmn9zAdEaOFfmQAcK6dlz5nfQ3X8")
})(Localisation);