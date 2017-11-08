import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { upVote, downVote, addWhoVoted } from '../../firebase'

export default class EntityCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entity: null,
			showDurationBar: true
		}
	}

	componentWillMount() {
		var entity = this.props.entity;
		var timeLimit = this.props.entity.timeLimit;
		var timeLimitDate = new Date(timeLimit);
		if(timeLimitDate.toString() === 'Invalid Date') {
			this.setState({showDurationBar: false})
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
								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
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