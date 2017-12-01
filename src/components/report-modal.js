import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { updateEntity, getCurrentUser } from '../firebase'

export default class ReportModal extends Component {
  constructor(props) {
      super(props)
      this.state = {
        report: ""
      }
  }

  componentDidMount() {
  }

  onSelectChange(event) {
  }

  submitToFirebase() {
  }

  textAreaOnChange(event) {
    this.setState({report: event.target.value})
  }

  submitReport(e) {
    e.preventDefault();
    this.props.addReport(
      this.props.user.uid,
      this.props.user.email,
      this.props.entityId,
      this.state.report,
      this.props.entity.subject
    );
  }

  render() {
  	return (
      <div>
        <button data-toggle="modal" data-target={`#reportModal${this.props.entity.uid}`} className="btn btn-outline-danger">Report</button>
        <div className="modal fade" id={`reportModal${this.props.entity.uid}`} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="reportModal">Report Entity</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body col-sm-12">
                <div className="container-fluid">
                  <textarea name="report" className="form-control col-sm-12" id="report" style={{marginTop: "20px"}} onChange={this.textAreaOnChange.bind(this)}></textarea>
                </div>
                <div style={{marginTop: "10px"}}>
                  <button id="editReviewButton" style={{marginRight:"10px"}} onClick={this.submitReport.bind(this)} type="button" className="btn btn-danger" data-dismiss="modal">Report</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  	)
  }
}

