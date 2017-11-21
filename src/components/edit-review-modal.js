import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import EntityReviewForm from './entity-components/entity-review-form'
import { updateEntity, getCurrentUser } from '../firebase'

export default class EditReviewModal extends Component {
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
        <button data-toggle="modal" data-target="#editReviewModal" className="btn btn-outline-secondary">Edit Review Response</button>
        <div className="modal fade" id="editReviewModal" tabIndex="-1" role="dialog" aria-labelledby="editPollModal" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editPollModal">Edit Review Response</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body col-sm-12">
                <EntityReviewForm
                  user={this.props.user}
                  entity={this.props.entity}
                  createEntityReview={this.props.createEntityReview}
                  checkReviewExists={this.props.checkReviewExists}
                  entityId={this.props.entityId}
                  edit={true}
                  selectedOption={this.props.selectedOption}
                  numStars={this.props.numStars}
                  reviewText={this.props.reviewText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}

