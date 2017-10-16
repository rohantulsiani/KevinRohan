import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getEntity, upVote, downVote, entityResponse, createEntityReview, checkReviewExists, createPollResponse, checkPollResponseExists } from '../firebase'
import { dispatchGetEntity } from '../reducers/entity-reducer'
import EntityPoll from '../components/entity-components/entity-poll'
import EntityReview from '../components/entity-components/entity-review'

const UpVote = (numUpVote, id) => {
	return (
		<span className="badge badge-success badge-vote" onClick={() => upVote(id)}> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	)
}

const DownVote = (numDownVote, id) => {
	return (
		<span className="badge badge-danger badge-vote" onClick={() => downVote(id) }> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	)
}

class Entity extends Component {
	constructor(props) {
		super(props)
		getEntity(this.props.dispatchGetEntity, this.props.match.params.id)
	}
	render() {
		var user = (this.props.entity.anonymous) ? 'Anonymous' : this.props.entity.owner;
		return (
			<div className="fluid-container">
				<div className="row">
					<div className="col-sm-12 col-md-5">
						<div className="card card-fill">
							<div className="card-title">
								<h4><span className="badge badge-warning">{this.props.entity.entityType}</span> by {user}</h4>
							</div>
							<div className="card-block">
								<h1 className="card-text">{this.props.entity.subject}</h1>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-7">
						<div className="card card-fill">
							<div className="card-header">Summary</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-12 col-md-5">
						<div className="card card-fill">
							<div className="card-header">
								<h4>Respond to {this.props.entity.entityType}</h4>
							</div>
							<div className="card-block">
								<div className="card-text">
									{
										(this.props.entity.entityType === 'Review') ? 
										<EntityReview entity={this.props.entity} createEntityReview={createEntityReview} checkReviewExists={checkReviewExists} entityId={this.props.match.params.id} /> 
										: <EntityPoll entity={this.props.entity} createPollResponse={createPollResponse} checkPollResponseExists={checkPollResponseExists} entityId={this.props.match.params.id} /> 
									}
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-7">
						<div className="card card-fill">
							<div className="card-header">Summary</div>
						</div>
					</div>
					<h1>This is Entity #{this.props.match.params.id}</h1>
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		entity: state.entity
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators ( {
		dispatchGetEntity
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Entity)