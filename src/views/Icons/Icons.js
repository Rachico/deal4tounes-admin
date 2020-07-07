/*eslint-disable*/
import React, { Component } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Table from "components/Table/Table.js";
import Axios from 'axios';
import {Button, Modal } from 'react-bootstrap';

import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import createBrowserHistory from 'history/createBrowserHistory';

const useStyles = makeStyles(styles);

class Icons extends Component {
  constructor() {
    super();
    this.state = {
        actions:[],
        show:false,
        title:'',
        body:'',
        lat:null,
        lng:null,
        
    }
   
  }

  handleSubmit= () => {
    Axios.post(`http://127.0.0.1:8000/api/actions`,{
         title : this.state.title,
         body:this.state.body,
         lat:this.state.lat,
         lng:this.state.lng,

    
      }).then(
        response =>{
          console.log(response);
          this.refreshPage();
      
      })
  
      
  }

  refreshPage() {
    window.location.reload(false);
  }

 

  handleClose = () => {
    this.setState({show:false});
  } 

  handleShow = () => {
    this.setState({show:true});
  } 
  handleChange = input=> e => {
    this.setState({ 
      [input]: e.target.value 
    });
  }

  componentDidMount(){
    Axios.get(`http://127.0.0.1:8000/api/auth/action`,{
         
    
      }).then(
        response =>{
          console.log(response);
          this.setState({actions:response['data'].Actions});
      
      })
  }

  render(){
    const { show } =this.state;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        <Button variant="primary"  onClick={this.handleShow}>Ajouter</Button>
        <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton style={{backgroundColor:'#18d26e'}}>
              <Modal.Title style={{color:'white'}}>Merci d'avoir participé</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'40px'}}>
                  <div style={{display:'flex', justifyContent:'center', marginBottom: '20px'}}>
                  <form action="" method="post" role="form" onSubmit={this.handleSubmit}>
                  <label style={{fontFamily:"Open Sans"}}>
                          Titre
                          <input type="text" name="title" onChange={this.handleChange('title')} />
                  </label>
                  <label style={{fontFamily:"Open Sans"}}>
                          Description
                          <input type="text" name="body" onChange={this.handleChange('body')} />
                  </label>
                  <label style={{fontFamily:"Open Sans"}}>
                          LAT
                          <input type="text" name="lat" onChange={this.handleChange('lat')} />
                  </label>
                  <label style={{fontFamily:"Open Sans"}}>
                          LNG
                          <input type="text" name="lng" onChange={this.handleChange('lng')} />
                  </label>
                    <button type="submit" className="btn btn-primary">
                        Ajouter
                    </button>

                  </form> 
                  
                
                  </div> 
           
                
            </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    
                  </Modal.Footer>
                </Modal>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Titre", "Description", "LAT ","LNG"]}
                tableData={
                  this.state.actions.map((action, i) => {
                           return  (     
                                [action.id,action.title,action.body,action.lat,action.lng]
                                   
                           );
                  })
              
                  
                }
              />
            </CardBody>
            
          </Card>
        </GridItem>
      </GridContainer>
    );
  }

}
export default Icons;
export const history = createBrowserHistory(); 
  
  

