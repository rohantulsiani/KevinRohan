import React, {Component} from 'react'
import { Switch, Route, Link } from 'react-router-dom'

export default class Navbar extends Component {
	render() {
		return (
			<nav style={{backgroundColor:"#db3236"}} className="navbar navbar-expand-lg navbar-dark">
  				<Link to="/" className="navbar-brand">KnowItAll</Link>
  				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    				<span className="navbar-toggler-icon"></span>
  				</button>

  				<div className="collapse navbar-collapse" id="navbarSupportedContent">
    				<ul className="navbar-nav mr-auto">
      					<li className="nav-item active">
                    <Link className="nav-link" to="/login">Login</Link>
      					</li>
      					<li className="nav-item active">
        					<a className="nav-link" href="#">Link</a>
      					</li>
    				</ul>
    				<form className="form-inline my-2 my-lg-0">
      					<input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
      					<button style={{color: "white", borderColor: "white"}} className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    				</form>
  				</div>
			</nav>
		)
	}
}