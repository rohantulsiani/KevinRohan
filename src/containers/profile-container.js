import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {unfollow, follow, registerUser, getUserData, logout, login, getCurrentUser, getEntities, getUser, updateProfilePic} from '../firebase'
import {dispatchAttemptLogin} from '../reducers/login-reducer'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import EntityCard from '../components/entity-components/entity-card'
import ProfileComment from '../components/profile-components/profile-comment'

class Profile extends Component {
  constructor(props) {
    super(props);  
    this.state = {commentOrPost:"Post", userObject:null}
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

  componentDidMount() {
    const uid = this.props.match.params.id
    getUser(this,uid)
  }

  componentWillReceiveProps(newProps) {
      getUser(this,newProps.match.params.id)
  }

  render() {
    var commentArray = []
    var reviewsArray = []
    var pollResponsesArray = []
    var entities = this.props.entities
    var numReviews = 0
    var numPolls = 0
    var yourProfile = true;
    
    if(this.props.user.uid && this.props.match.params.id)
    {
      yourProfile = this.props.user.uid == this.props.match.params.id;
    }
  
    if(this.state.userObject && this.props.entities) {
      for(var key in this.props.entities) {
        var entity = this.props.entities[key]
        numReviews = (entity.owner === this.state.userObject.email && entity.entityType === "Review") ? numReviews + 1 : numReviews
        numPolls = (entity.owner === this.state.userObject.email && entity.entityType === "Poll") ? numPolls + 1 : numPolls
        if(entity.entityType === "Poll" && entity.pollResponses){
          if(entity.pollResponses.hasOwnProperty(this.props.match.params.id))
            pollResponsesArray.push(entity.pollResponses[this.props.match.params.id])
        } else if(entity.entityType === "Review" && entity.reviews) {
          if(entity.reviews.hasOwnProperty(this.props.match.params.id))
            reviewsArray.push(entity.reviews[this.props.match.params.id])
        }
        for(var key1 in entity.comments) {
          var comment = entity.comments[key1]
          comment.key = key1
          var commentor = comment.commentorEmail      

          if(commentor == this.state.userObject.email) {
            commentArray.push(comment)
          }
        }
      }
    }
    
    var isFollowing = false;
    if(this.props.user.following) {
      isFollowing = Object.keys(this.props.user.following).includes(this.props.match.params.id)
    }

  	return (
		  <div className="container">
        <div className="row" style={{marginTop: "20px"}}>
          <div className="image-upload col-sm-12 col-md-3" style={{textAlign: "center"}}>
            <label htmlFor="file-input">
              {
                this.state.userObject !== null ? (!this.state.userObject.photoURL ?
                (
                  <i className="fa fa-user fa-4x" ariaHidden="true" 
                    style={{paddingTop: "15px",cursor:"pointer", backgroundColor:"lightGray", borderRadius:"100px", height: "1.5em", width: "1.5em"}}
                  ></i>
                ):
                  <img className="img-fluid rounded-circle"
                  src={this.state.userObject.photoURL} />):<div></div>
              }
            </label>
            <input id="file-input" type="file" accept="image/*" style={{display:"none"}} onChange={(e)=> this.changeProfilePic(e)}/>
          </div>

          <div className="col-sm-12 col-md-9">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h4>{this.state.userObject ? this.state.userObject.email: ""}</h4>
                {!yourProfile ? (!isFollowing ? <button onClick={()=>{follow(this.props.user.uid, this.props.user.email, this.props.match.params.id, this.state.userObject.email)}} className="btn btn-success">Follow</button> : <button onClick={()=>{unfollow(this.props.user.uid, this.props.match.params.id)}} className="btn btn-danger">Unfollow</button>) : <div></div>}
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
                  return user == (this.state.userObject != null ? this.state.userObject.email : "") ? (
                    <EntityCard user={this.props.user} isLoggedIn={this.props.user !== null} key={key} entity={this.props.entities[key]} entityId={key} />

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