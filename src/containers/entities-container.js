import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityCard from '../components/entity-components/entity-card'
import CreateEntityModal from '../components/create-entity-modal'
import { getEntities, addEntity } from '../firebase'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import TagInput from '../components/tag-input'
class Entities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'All'
    }
  }
  render() {
  	return (
  		<div className="container-fluid">
      		<h1 style={{marginTop:'15px', textAlign: "center"}} className="col-sm-12" id="mainPage">Posts</h1>
      		<div className="row">
  	    		  <div className="col-sm-4"></div>
  	    			<CreateEntityModal user={this.props.user} isLoggedIn={this.props.user !== null} />
  	    			<div className="col-sm-4"></div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <select value={this.state.category} id="category" onChange={ (event) => { this.setState({category: event.target.value}) } } className="form-control">
                      <option>All</option>
                      <option>Trending</option>
                      <option>Classes</option>
                      <option>Professors</option>
                      <option>Events</option>
                      <option>Food</option>
                      <option>Concerts</option>
                      <option>Amusement</option>
                      <option>Random</option>
                  </select>
              </div>
              <div className="col-sm-4"></div>
      		</div>
          <div style={{marginTop: '15px' }} className="row">
            {
              (this.props.entities) ? (
                Object.keys(this.props.entities).map((key) => {
                  if(this.state.category == 'All' || this.state.category == 'Trending'){
                    return (
                      <EntityCard user={this.props.user} isLoggedIn={this.props.user !== null} key={key} entity={this.props.entities[key]} entityId={key} />
                    )
                  } else {
                    const entity = this.props.entities[key]
                    if(entity.category === this.state.category) {
                      return (
                        <EntityCard isLoggedIn={this.props.user !== null} key={key} entity={this.props.entities[key]} entityId={key} />
                      )
                    }
                  }
                }).sort((a, b) => {
                  if(this.state.category == 'Trending') {
                    var aNum = a.props.entity.numUpVote ? a.props.entity.numUpVote : 0;
                    var bNum = b.props.entity.numUpVote ? b.props.entity.numUpVote : 0;
                    if (aNum < bNum) {
                      return 1
                    }
                    if (aNum > bNum) {
                      return -1
                    }
                    return 0
                  }

                  return 0
                })
              ) : (
                <div></div>
              )
            }
          </div>
      	</div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
    user: state.loginInfo,
    users: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchGetEntities }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Entities);