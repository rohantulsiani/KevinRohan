import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {registerUser, getUserData, logout, login, getCurrentUser, getEntities} from '../firebase'
import {dispatchAttemptLogin} from '../reducers/login-reducer'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import EntityCard from '../components/entity-components/entity-card'

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

  render() {
  	return (
		  <div className="container">
        <div className="row">
          {this.props.user ? <h1 className="col-sm-12" style={{marginTop:"1em", marginBottom:"0", textAlign:"center"}}>{this.props.user.email}</h1> : <div></div>}
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
        ): <div></div>}
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