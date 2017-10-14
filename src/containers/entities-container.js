import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Entities extends Component {
  render() {
  	return (
		<div className="row">
    		<h1 style={{marginTop:'15px', textAlign:"center"}} className="col-sm-12">Entities</h1>
    	</div>
  	)
  }
}

export default connect()(Entities)
