import React, { Component } from 'react';
import Navbar from './navbar'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Entities from '../containers/entities-container'

export default class App extends Component {
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

connect()(App);
