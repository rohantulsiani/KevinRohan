import React, { Component } from 'react';
import moment from 'moment';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { 
	getEntity,
	getCurrentUser,
	upVote,
	downVote,
	entityResponse,
	createEntityReview, 
	checkReviewExists,
	createPollResponse,
	checkPollResponseExists,
	createEntityComment, 
	addWhoVoted
} from '../firebase'
import { dispatchGetEntity } from '../reducers/entity-reducer'
import EntityPollForm from '../components/entity-components/entity-poll-form'
import EntityReviewForm from '../components/entity-components/entity-review-form'
import EntityCommentForm from '../components/entity-components/entity-comment-form'
import EntityComment from '../components/entity-components/entity-comment'
import EntityReview from '../components/entity-components/entity-review'
import EntityPoll from '../components/entity-components/entity-poll'
import EditEntityModal from '../components/edit-entity-modal'

const UpVote = (disabled, numUpVote, id, user, entity) => {
	if(!disabled)
	{
		return <span id="upVoteButton" className="badge badge-success badge-vote" onClick={() => { if(addWhoVoted(id, entity, user.uid)){upVote(id)} }}> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
	else
	{
		return <span className="badge badge-success badge-vote"> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
}

const DownVote = (disabled, numDownVote, id, user, entity) => {
	if(!disabled)
	{
		return <span id="downVoteButton" className="badge badge-danger badge-vote" onClick={() => { if(addWhoVoted(id, entity, user.uid)){downVote(id)} }}> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
	else
	{
		return <span className="badge badge-danger badge-vote"> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
}


class Entity extends Component {
	constructor(props) {
		super(props)
		this.state = {
			entity: null,
			showDurationBar: false,
			expired: false,
			duration: 100,
			now: 0,
			timeLeft: "0",
			percentage: "100"
		}
	}

	componentWillReceiveProps(props) {
		if(props.entity instanceof Array) {
			if(props.entity.length == 0) {
				this.props.history.push('/');
			}
		}
	}

	componentDidMount() {
		// if(this.state.now <= this.state.duration) {
		// 	this.durationTicker = setInterval(
		// 		() => this.setDuration(),
		// 		1000
		// 	);
		// }
	}

	componentWillUnmount() {
		clearInterval(this.durationTicker);
	}

	componentWillMount() {
		getEntity(this.props.dispatchGetEntity, this.props.match.params.id)
	}

	setDuration() {
		var entity = this.props.entity;
		var timeLimit = this.props.entity.timeLimit;
		var timeLimitDate = new Date(timeLimit);
		var createdAt = this.props.entity.timeCreatedAt;
		var createdAtDate = new Date(createdAt);
		if(timeLimitDate.toString() === 'Invalid Date' || createdAtDate.toString() === 'Invalid Date') {
			this.setState({showDurationBar: false})
		} else {
			this.setState({showDurationBar: true})
			// code following this will help with duration
			var now = moment(new Date()); // date right now
			var start = moment(createdAtDate);
			var end = moment(timeLimitDate);

			// moment objects
			var duration = moment.duration(end.diff(start));
			var timePast = moment.duration(now.diff(start));
			var durationMinutes = duration.asMinutes();
			var timePastMinutes = timePast.asMinutes();
			if(timePastMinutes > durationMinutes) {
				this.setState({expired: true})
			} else {
				this.setState({
					expired: false,
					now: Math.round(timePastMinutes),
					duration: Math.round(durationMinutes),
					timeLeft: now.to(end, true),
					percentage: Math.round((timePastMinutes/durationMinutes)*100).toString()
				})
			}
		}
	}
	
	render() {
		var numUpVote = (this.props.entity.numUpVote) ? this.props.entity.numUpVote : 0;
		var numDownVote = this.props.entity.numDownVote ? this.props.entity.numDownVote : 0;
		var entityId = this.props.match.params.id;
		var user = (this.props.entity.anonymous) ? 'Anonymous' : this.props.entity.owner;
		var comments = (this.props.entity.comments) ? this.props.entity.comments : {}
		var commentsKeys = (this.props.entity.comments) ? Object.keys(comments) : []
		var reviews = (this.props.entity.reviews) ? this.props.entity.reviews: {}
		var reviewsKeys = (this.props.entity.reviews) ? Object.keys(reviews) : []
		var polls = (this.props.entity.pollResponses) ? this.props.entity.pollResponses : {}
		var pollsKeys = (this.props.entity.pollResponses) ? Object.keys(polls) : []
		var details = (this.props.entity.details) ? this.props.entity.details : ""
		const disable = (this.props.user !== null) ? false : true
		var tags = this.props.entity.tags ? this.props.entity.tags : []
		var profile = "/"
		if(this.props.entity.uid) {
			profile=`/profile/${this.props.entity.uid}`
		}

		if(this.state.expired) {
			clearInterval(this.durationTicker)
		} else {
			var now = this.state.now
			if(now > this.state.duration) {
				now = this.state.duration
			}
			if(now <= this.state.duration) {
				clearInterval(this.durationTicker)
				this.durationTicker = setInterval(
					() => {
						this.setDuration()
					},
					1000
				);
			}
		}
		return (
			<div className="fluid-container">
				<div className="card card-fill">
					<div className="card-header">
						<h4>
							<span className="badge badge-warning">{this.props.entity.entityType}</span> by {user != "Anonymous" ? <Link to={profile}>{user}</Link> : user} {UpVote(disable, numUpVote, entityId, this.props.user, this.props.entity)} {DownVote(disable, numDownVote, entityId, this.props.user, this.props.entity)}
							<span className="pull-right">{ this.props.user ? (this.props.entity.owner === this.props.user.email ? <EditEntityModal entityId={entityId} entity={this.props.entity} /> : <div></div> ) : <div></div>}</span>
						</h4>
					</div>
					<div className="card-text row" style={{marginTop: "20px"}}>
						<div className="col-sm-12 col-md-5">
							<h1>{this.props.entity.subject}</h1>
							{
									this.state.showDurationBar ? (
										<div>
											<h7> { this.state.expired ? 'Expired' : this.state.timeLeft + " left" } </h7>
											<div className="progress">
												<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" style={{width: this.state.percentage+"%"}}
													aria-valuenow={this.state.expired ? "0" : this.state.now.toString() } aria-valuemax={this.state.expired ? "100" : this.state.duration.toString()} > {this.state.percentage+"%"}
												</div>
											</div>
										</div>
									) : (
										<div></div>
									)
								}
						</div>
						<div className="col-sm-12 col-md-7">
							<div className="card-title">
								<h5>Details:</h5>
								<span style={{marginLeft: "5px"}}>{details}</span>
								<h5>Tags:</h5>
								{
									tags.map((tag, i) => {
										return <span className="badge badge-info" style={{marginLeft: "5px"}} key={i}>{tag}</span>
									})
								}
							</div>
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
										<EntityReviewForm expired={this.state.expired} user={this.props.user} entity={this.props.entity} createEntityReview={createEntityReview} checkReviewExists={checkReviewExists} entityId={this.props.match.params.id} /> 
										: <EntityPollForm expired={this.state.expired} user={this.props.user} entity={this.props.entity} createPollResponse={createPollResponse} checkPollResponseExists={checkPollResponseExists} entityId={this.props.match.params.id} /> 
									}
								</div>
							</div>
						</div>

						<div className="card card-fill">
							<div className="card-header">
								<h4> Leave a Comment</h4>
							</div>
							<div className="card-block">
								<div className="card-text">
									<EntityCommentForm expired={this.state.expired} user={this.props.user} entity={this.props.entity} entityId={this.props.match.params.id} createEntityComment={createEntityComment}/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-12 col-md-7">
						<div className="card card-fill">
							
							<ul className="nav nav-tabs" role="tablist">
								<li className="nav-item">
									<a className="nav-link active" href="#responses" role="tab" data-toggle="tab" >{ (this.props.entity.entityType === 'Poll') ? 'Poll Responses' : 'Reviews' }</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#comments" role="tab" data-toggle="tab">Comments</a>
								</li>
							</ul>

							<div style={{padding: "5px 15px 5px 15px"}} className="tab-content">
								<div role="tabpanel" className="tab-pane fade in active show" id="responses">
									{
										(this.props.entity.entityType === 'Review') ? (
											reviewsKeys.map((reviewKey, key) => {
												return (
													<EntityReview review={reviews[reviewKey]} key={key} />
												)
											})
										) : (
											pollsKeys.map((pollKey, key) => {
												return (
													<EntityPoll poll={polls[pollKey]} key={key} />
												)
											})
										)
									}
								</div>
								<div role="tabpanel" className="tab-pane fade in" id="comments">
									{
										commentsKeys.map((commentKey, key) => {
											return (
												<EntityComment comment={comments[commentKey]} key={key} />
											)
										})
									}
								</div>
							</div>



						</div>
					</div>
				</div>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		entity: state.entity,
		user: state.loginInfo
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators ( {
		dispatchGetEntity
	}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Entity)