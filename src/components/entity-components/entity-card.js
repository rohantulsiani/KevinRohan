import React, { Component } from 'react';
import moment from 'moment';
import { Switch, Route, Link } from 'react-router-dom'
import { upVote, downVote, addWhoVoted } from '../../firebase'

export default class EntityCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entity: null,
			showDurationBar: true,
			expired: false,
			duration: 100,
			now: 0,
			timeLeft: moment(new Date()),
			percentage: "0"
		}
	}

	componentWillMount() {
		var entity = this.props.entity;
		var timeLimit = this.props.entity.timeLimit;
		var timeLimitDate = new Date(timeLimit);
		var createdAt = this.props.entity.timeCreatedAt;
		var createdAtDate = new Date(createdAt);
		if(timeLimitDate.toString() === 'Invalid Date' || createdAtDate.toString() === 'Invalid Date') {
			this.setState({showDurationBar: false})
		} else {
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
					now: Math.round(timePastMinutes),
					duration: Math.round(durationMinutes),
					timeLeft: now.to(end, true),
					percentage: Math.round((timePastMinutes/durationMinutes)*100).toString()
				})
			}
			//console.log("time past", timePastMinutes, "duration", durationMinutes, "percentage", Math.round(timePastMinutes/durationMinutes).toString());
		}
	}

 UpVote(isLoggedIn, numUpVote, id, user, entity){
	if(isLoggedIn)
	{
		return <span className="badge badge-success badge-vote" onClick={() => { if(addWhoVoted(id, entity, user.uid)){upVote(id)} }}> <span className="glyphicon glyphicon-chevron-up" >^</span> {numUpVote}</span>
	}
	else
	{
		return <span className="badge badge-success badge-vote"> <span className="glyphicon glyphicon-chevron-up">^</span> {numUpVote}</span>
	}
}

   DownVote(isLoggedIn, numDownVote, id, user, entity){
	if(isLoggedIn)
	{
		return <span className="badge badge-danger badge-vote" onClick={() => { if(addWhoVoted(id, entity, user.uid)){downVote(id)} } }> <span className="glyphicon glyphicon-chevron-down" >v</span> {numDownVote}</span>
	}
	else
	{
		return <span className="badge badge-danger badge-vote"> <span className="glyphicon glyphicon-chevron-down">v</span> {numDownVote}</span>
	}
}

	render() {
		// console.log(this.state)
		var subject = this.props.entity.subject;
		var type = this.props.entity.entityType;
		var numUpVote = (this.props.entity.numUpVote) ? this.props.entity.numUpVote : 0;
		var numDownVote = this.props.entity.numDownVote ? this.props.entity.numDownVote : 0;
		var user = (this.props.entity.anonymous) ? 'Anonymous' : this.props.entity.owner;
		var numComments = (this.props.entity.comments) ? Object.keys(this.props.entity.comments).length : 0;
		var entityId = this.props.entityId;
		var tags = this.props.entity.tags ? this.props.entity.tags : []

		return (
			<div className="col-sm-12 col-md-6 col-lg-4">
	            <div className="panel panel-default panel-google-plus">
	                <div className="panel-google-plus-tags">
	                    <ul>
	                        <li>{this.props.entity.category}</li>
							{
								tags.map((tag, i) => {
									return <li key={i}>{tag}</li>
								})
							}
	                    </ul>
	                </div>
	                <div className="panel-heading">
						<h3><span className="badge badge-warning">{type}</span> by {user} {this.UpVote(this.props.isLoggedIn, numUpVote, entityId, this.props.user, this.props.entity)} {this.DownVote(this.props.isLoggedIn, numDownVote, entityId, this.props.user, this.props.entity)}</h3>
	                </div>
	                <div className="panel-body" style={{wordWrap:"break-all", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "10px"}}>
	                    <h2>{subject}</h2>
						{
							this.state.showDurationBar ? (
								<div>
									<h7> { this.state.expired ? 'Expired' : this.state.timeLeft + " left" } </h7>
									<div className="progress">
										<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" style={{width: this.state.percentage+"%"}}
											aria-valuenow={this.state.expired ? "0" : this.state.now.toString() } aria-valuemax={this.state.expired ? "100" : this.state.duration.toString()} >
										</div>
									</div>
								</div>
							) : (
								<div></div>
							)
						}
	                </div>
	                <div className="panel-footer">
	                    <span style={{color: 'darkGrey'}}>{numComments} Comments</span>
						<Link to={`/entities/${entityId}`} className="btn btn-outline-info btn-sm" id="viewPostButton">View Post</Link>
	                </div>
	            </div>
			</div>
		)
	}
}