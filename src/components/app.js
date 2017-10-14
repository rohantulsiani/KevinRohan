import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import Navbar from './navbar'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Entities from '../containers/entities-container'
import { firebaseInit, getEntities } from '../firebase'
import { dispatchGetEntities } from '../reducers/entities-reducer'

class App extends Component {
  constructor(props) {
    super(props)
    firebaseInit()
    console.log(this.props.dispatchGetEntities)
    getEntities(this.props.dispatchGetEntities)
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators( { dispatchGetEntities }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
