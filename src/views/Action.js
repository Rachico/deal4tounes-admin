  
import React, {useState, Component} from 'react';

import {Button, Modal } from 'react-bootstrap';
//import createBrowserHistory from 'history/createBrowserHistory';

import Axios from 'axios';

class Action extends Component{
  
    constructor(props){
      super(props);  
      
      this.state={
        code_id:'',
        client_id:'',
        show:null,
        
      }
    }

    handleChange = input=> e => {
      this.setState({ 
        [input]: e.target.value 
      });
    }

    handleSubmit= () => {
      
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

    componentDidMount(){
      Axios.get(`http://127.0.0.1:8000/api/auth/user`,{
         headers:{
          Authorization :`Bearer ${localStorage.getItem('store')}`
         }
        }).then(
          response =>{
            console.log(response);
            this.setState({client_id:response['data'].id});
          
        
        });

    }


    handleSubmit = event => {

      event.preventDefault();
      
     Axios.patch(`http://127.0.0.1:8000/api/client/${this.state.client_id}/points/${this.state.code_id}`, { 
      
        }).then(response => { 
          this.refreshPage();
          console.log(response);
       
          }).catch(errors => {
                console.log(errors)
          });
}
  

    render(){
      const { show, code } =this.state;
      
      
        return(

          <div className="row flex tc bg-white dib br3 pa3 ma4 grow bw shadow-1" style={{margin:'50px'}}>
            <h1 style={{ fontFamily:"Open Sans"}} className="mr-3">Cliquez ici une fois vous avez effectué l'action</h1>
            
            <div class='row'>
            
            <div class='col-8'>
                
                
                <Button variant="secondary" onClick={this.handleShow}>Participer</Button>
                
                
                </div> 
            </div>
            
            <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton style={{backgroundColor:'#18d26e'}}>
              <Modal.Title style={{color:'white'}}>Merci d'avoir participé</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'40px'}}>
                  <div style={{display:'flex', justifyContent:'center', marginBottom: '20px'}}>
                  <form action="" method="post" role="form" onSubmit={this.handleSubmit}>
                  <label style={{fontFamily:"Open Sans"}}>
                          Entrer le code dactivation
                          <input type="text" name="id" onChange={this.handleChange('code_id')} />
                  </label>
                    <button type="submit" className="btn btn-primary">
                        Confirmer
                    </button>

                  </form> 
                  
                
                  </div> 
           


                  <p style={{fontFamily:"Open Sans"}}>Partager votre expérience avec toute la communauté</p>
                  
            </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                    
                  </Modal.Footer>
                </Modal>
        </div>

      );
    }
  }

  
  export default Action;
  //export const history = createBrowserHistory();