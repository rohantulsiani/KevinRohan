import React, {Component} from 'react';
import { Redirect } from 'react-router';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {registerUser, getUserData, logout, login, getCurrentUser, getEntities} from '../firebase';
import {dispatchAttemptLogin} from '../reducers/login-reducer';
import { dispatchGetEntities } from '../reducers/entities-reducer';
import { bindActionCreators } from 'redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
    
    getEntities(this.props.dispatchGetEntities);

    if(!this.props.authDone)
    {
      getUserData(this.props.dispatchAttemptLogin);
    }

    this.state = {searchInput:""};
  }

  onKeyPress(event) {
    const val = event.target.value;

    if(event.key == 'Enter') {
      this.props.history.push(`/search/${this.state.searchInput}`);
      this.setState({searchInput:""});
      return;
    }
  }

  logoutPressed(event) {
    logout();
    this.props.history.push('/');
  }



	render() {
    var myProfile = "/"
    if(this.props.user) {
      myProfile = `/profile/${this.props.user.uid}`
    }
		return (
			<nav style={{backgroundColor:"#DD4B3A"}} className="navbar navbar-expand-lg navbar-dark">
  				<Link id="knowItAllButton" to="/" className="navbar-brand"><img src="https://firebasestorage.googleapis.com/v0/b/knowitall-893d7.appspot.com/o/Logos%2Flogo.png?alt=media&token=44bfb8d4-9813-43b8-802c-3068c9356687"
          style = {{width : "7em", height: "2em"}}/></Link>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    				<span className="navbar-toggler-icon"></span>
  				</button>
  				<div className="collapse navbar-collapse" id="navbarSupportedContent">
    				<ul className="navbar-nav mr-auto">
      					<li  className="nav-item active">
                    {
                      this.props.user != "" ? (
                        this.props.user == null ? (
                            <Link  id = "login" className="nav-link login" to="/login">Login</Link>
                        ):(
                          <div onClick={this.logoutPressed.bind(this)} style={{cursor:"pointer"}} className="nav-link" id="logoutButton">Logout</div>
                        )):<div></div>
                    }
      					</li>
                { this.props.user != null && this.props.user != "" ? (
                    <li className="nav-item active">
                      <Link id = "profile" className="nav-link" to={myProfile} name="profileButtonInNavbar">Profile</Link>
                    </li>
                  ):(<div></div>)
                }
                { this.props.user != null && this.props.user != "" && this.props.user.isAdmin ? (
                    <li className="nav-item active">
                      <Link className="nav-link" to="/admin">Admin</Link>
                    </li>
                  ):(<div></div>)
                }
    				</ul>
           
    				<div className="form-inline my-2 my-lg-0">
      					<input value={this.state.searchInput} onKeyPress={this.onKeyPress.bind(this)} onChange={(event)=>{this.setState({searchInput:event.target.value})}} className="form-control mr-sm-2" type="text" placeholder="Search" id="searchInput" aria-label="Search" />
      					<Link onClick={()=>{this.setState({searchInput:""})}} to={`/search/${this.state.searchInput}`} style={{display:"block", color: "white", borderColor: "white"}} className="btn" id="searchButton">Search</Link>
    				</div>
  				</div>
			</nav>
		);
	}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchAttemptLogin, dispatchGetEntities }, dispatch);
}

function mapStateToProps(state) {
  return {
    user: state.loginInfo
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);