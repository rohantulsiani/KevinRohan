import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityCard from '../components/entity-components/entity-card'
import CreateEntityModal from '../components/create-entity-modal'
import { getEntities, addEntity, getReports } from '../firebase'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import { dispatchGetReports } from '../reducers/reports-reducer'
import AdminAccordion from '../components/admin-accordion'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "Entities"
    }
  }

  onEntities() {
    this.setState({ activeTab: "Entities"})
  }

  onReports() {
    this.setState({ activeTab: "Reports"})
  }

  render() {
    console.log(this.state.activeTab)
  	return (
  		<div className="container-fluid">
      		<h1 style={{marginTop:'15px', textAlign: "center"}} className="col-sm-12">Admin Console</h1>
          <ul className="nav nav-tabs" role="tablist" id="tabs">
            <li className="nav-item">
              <a className={this.state.activeTab === "Entities" ? "nav-link active" : "nav-link"} data-toggle="tab" href="#entitiesAdmin" role="tab" onClick={(e) => this.onEntities() }>Entities</a>
            </li>
            <li className="nav-item">
              <a className={this.state.activeTab === "Reports" ? "nav-link active" : "nav-link"} data-toggle="tab" href="#reportsAdmin" role="tab" onClick={(e) => this.onReports() }>Reports</a>
            </li>
          </ul>
          <div className="tab-content">
            {
              this.state.activeTab === "Entities" ? (
                <div className="tab-pane active" id="entitiesAdmin" role="tabpanel">
                  {
                    (this.props.entities) ? (
                      Object.keys(this.props.entities).map((key) => {
                        return (
                            <AdminAccordion key={key} entity={this.props.entities[key]} entityId={key} />
                            )
                          })
                        ) : (
                          <div></div>
                        )
                  }
                </div>
              ) : (
                <div className="tab-pane active" id="entitiesReports" role="tabpanel">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Entity Subject</th>
                        <th>Reporter</th>
                        <th>Problem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        (this.props.reports) ? (
                          Object.keys(this.props.reports).map((key) => {
                            return (
                              <tr key={key}>
                                <th scope="row">{this.props.reports[key].subject}</th>
                                <td>{this.props.reports[key].userEmail}</td>
                                <td>{this.props.reports[key].reportText}</td>
                              </tr>
                            )
                          })
                        ) : (
                          <div></div>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              )
            }
          </div>
      </div>
  	)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchGetReports }, dispatch);
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
    reports: state.reports
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);