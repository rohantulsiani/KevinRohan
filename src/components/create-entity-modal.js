import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

export default class CreateEntityModal extends Component {
  render() {
  	return (
      <div className="col-sm-4">
      <button data-toggle="modal" data-target="#createModal" style={{backgroundColor: "#db3236"}} className="col-sm-12 btn btn-success">Add Entity</button>

<div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</div>
  	)
  }
}

