import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Search extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="row">
				<h1>{this.props.match.params.query}</h1>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		entities: state.entities
	}
}

export default connect(mapStateToProps, null)(Search)