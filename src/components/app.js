import React, { Component } from 'react';
import Navbar from './navbar'
import { Switch, Route } from 'react-router-dom'
import Entities from '../containers/entities-container'
import { firebaseInit } from '../firebase'

export default class App extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
  }

  render() {
    return (
    	<div>
        <Navbar />
        <div className="container">
      		<Route exact path='/' render={()=>{return (
            <div>
              <Entities />
            </div>
          )}} />
    			<Route path='/login' render={()=>{return(
  				  <h1>Login</h1>
    			)}}/>	
        	</div>
        </div>
    );
  }
}


