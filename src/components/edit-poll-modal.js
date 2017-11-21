import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import EntityPollForm from './entity-components/entity-poll-form'
import { updateEntity, getCurrentUser } from '../firebase'

export default class EditPollModal extends Component {
  constructor(props) {
      super(props)
  }

  componentDidMount() {
  }

  onSelectChange(event) {
  }

  submitToFirebase() {
  }

  render() {
  	return (
      <div>
        <button data-toggle="modal" data-target="#editPollModal" className="btn btn-outline-secondary">Edit Poll Response</button>
        <div className="modal fade" id="editPollModal" tabIndex="-1" role="dialog" aria-labelledby="editPollModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editPollModal">Edit Poll Response</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body col-sm-12">
                <EntityPollForm
                  user={this.props.user}
                  entity={this.props.entity}
                  createPollResponse={this.props.createPollResponse}
                  checkPollResponseExists={this.props.checkPollResponseExists}
                  entityId={this.props.entityId}
                  edit={true}
                  selectedOption={this.props.selectedOption}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}

