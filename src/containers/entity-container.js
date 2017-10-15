import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Entity extends Component {
	render() {
		return (
			<h1>This is Entity #{this.props.match.params.id}</h1>
		)
	}
}

export default connect()(Entity)