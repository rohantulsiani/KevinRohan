import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {registerUser, getUserData, logout, login, getCurrentUser, getEntities, updateProfilePic} from '../firebase'
import {dispatchAttemptLogin} from '../reducers/login-reducer'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import EntityCard from '../components/entity-components/entity-card'
import ProfileComment from '../components/profile-components/profile-comment'

class Profile extends Component {
  constructor(props) {
    super(props);  
    this.state = {commentOrPost:"Post"}
  }

  onComments() {
    this.setState({commentOrPost: "Comment"})
    $('#comment').css('color', 'blue');
    $('#comment').css('font-weight', 'bold');
    $('#post').css('color', 'black');
    $('#post').css('font-weight', 'normal');
  }

  onPosts() {
    this.setState({commentOrPost: "Post"})
    $('#comment').css('color', 'black');
    $('#comment').css('font-weight', 'normal');
    $('#post').css('color', 'blue');
    $('#post').css('font-weight', 'bold');
  }

  changeProfilePic(e){
    var file = e.target.files[0];
    updateProfilePic(file)
  }


  render() {
    var commentArray = []
    var reviewsArray = []
    var pollResponsesArray = []
    var entities = this.props.entities
    var numReviews = 0
    var numPolls = 0
    if(this.props.user && this.props.entities) {
      var userID = this.props.user.uid
      for(var key in this.props.entities) {
        var entity = this.props.entities[key]
        numReviews = (entity.owner === this.props.user.email && entity.entityType === "Review") ? numReviews + 1 : numReviews
        numPolls = (entity.owner === this.props.user.email && entity.entityType === "Poll") ? numPolls + 1 : numPolls
        if(entity.entityType === "Poll" && entity.pollResponses){
          if(entity.pollResponses.hasOwnProperty(userID))
            pollResponsesArray.push(entity.pollResponses[userID])
        } else if(entity.entityType === "Review" && entity.reviews) {
          if(entity.reviews.hasOwnProperty(userID))
            reviewsArray.push(entity.reviews[userID])
        }
        for(var key1 in entity.comments) {
          var comment = entity.comments[key1]
          comment.key = key1
          var commentor = comment.commentor
          if(commentor == userID) {
            commentArray.push(comment)
          }
        }
      }
    }
    
  	return (
		  <div className="container">
        <div className="row" style={{marginTop: "20px"}}>
          <div className="image-upload col-sm-12 col-md-3" style={{textAlign: "center"}}>
            <label htmlFor="file-input">
              {
                this.props.user != "" ? (this.props.user.photoURL == undefined ?
                (
                  <i className="fa fa-user fa-4x" ariaHidden="true" 
                    style={{paddingTop: "15px",cursor:"pointer", backgroundColor:"lightGray", borderRadius:"100px", height: "1.5em", width: "1.5em"}}
                  ></i>
                ):
                  <img className="img-fluid rounded-circle"
                  src={this.props.user.photoURL} />):<div></div>
              }
            </label>
            <input id="file-input" type="file" accept="image/*" style={{display:"none"}} onChange={(e)=> this.changeProfilePic(e)}/>
          </div>

          <div className="col-sm-12 col-md-9">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>{this.props.user ? this.props.user.email: ""}</h4>
              </li>
              <li className="list-group-item d-flex justify-content-betwee  n align-items-center">
                <h5>Display Name:</h5>
                <span className="">{this.props.user.displayName}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h7># of Reviews Created:</h7>
                <span className="badge badge-primary badge-pill">{numReviews}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h7># of Polls Created:</h7>
                <span className="badge badge-primary badge-pill">{numPolls}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h7>Responses:</h7>
                <span className="badge badge-primary badge-pill">{commentArray.length} comments</span>
                <span className="badge badge-primary badge-pill">{reviewsArray.length} reviews</span>
                <span className="badge badge-primary badge-pill">{pollResponsesArray.length} polls</span>
              </li>
            </ul>
          </div>
        </div>
      <div className="container"></div>
            <div className="col-sm-12">
              <ul ref="option" className="col-sm-12" style={{textAlign:"center", display:"inline-block", margin:"auto", marginTop:"15px"}}>
               <li style={{display:"inline-block"}}>
                   <button className="profile-button" id="post" onClick={this.onPosts.bind(this)} style={{cursor:"pointer", color:"blue", fontWeight:"bold", border:"none", "backgroundColor":"white", marginBottom:"1em", padding:"0 1em 0 1em"}}> Posts </button>
                </li>
                <li style={{display:"inline-block"}}>
                  <button className="profile-button" id="comment" onClick={this.onComments.bind(this)} style={{cursor:"pointer", border:"none", "backgroundColor":"white", marginBottom:"1em"}}> Comments </button>
                </li>
              </ul>
      </div>

      <hr className="style-three" />

      <div className="container-fluid">
        {this.state.commentOrPost == "Post" ? (
          <div style={{marginTop:"20px"}}className="row">
            {
                Object.keys(this.props.entities).map((key) => {
                  const user = this.props.entities[key].owner
                  return user == (this.props.user != null ? this.props.user.email : "") ? (
                    <EntityCard key={key} entity={this.props.entities[key]} entityId={key} />
                  ) : (
                    <div key={key}></div>
                  )
                })
            }
          </div>
        ): (
          <div>
            {
              commentArray.map(function(comment) {
                return (
                  <ProfileComment key={comment.key} comment={comment} subject={entities[comment.entityId].subject} />
                )
              })
            }
          </div>
        )}
      </div>
    </div>
  	)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchAttemptLogin, dispatchGetEntities }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.loginInfo,
    entities: state.entities
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);