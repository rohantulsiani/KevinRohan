import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Entities extends Component {
  render() {
  	console.log(this.props)
  	return (
		<div className="row">
    		<h1 style={{marginTop:'15px', textAlign:"center"}} className="col-sm-12">Entities</h1>
    		<button onClick={this.props.GetEntitiesFromFirebase}>Test</button>
    	</div>
  	)
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators( { GetEntitiesFromFirebase }, dispatch);
}

export default connect(null, mapDispatchToProps)(Entities)
