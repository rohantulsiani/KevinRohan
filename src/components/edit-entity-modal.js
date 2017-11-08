import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import PollOptions from './modal-components/poll-options'
import { updateEntity, getCurrentUser } from '../firebase'

export default class EditEntityModal extends Component {
  constructor(props) {
      super(props)

      this.state = {
        type: 'Poll',
        category: 'Classes',
        anonymous: false,
        options: []
      }
  }

  componentDidMount() {
    var componentThis = this
    $('#datepickerEdit').datetimepicker({
      minDate: 0,
      format: 'MM/DD/YYYY hh:mm A'
    })
    $('#editModal').on('shown.bs.modal', function () {
      var entity = componentThis.props.entity;
      const subject = $("#subjectEdit").val(entity.subject)
      const timeLimit = $("#datepickerEdit").datetimepicker('setDate', new Date( Date.parse(entity.timeLimit,"mm/dd/yyyy hh:MM tt")) )
      let anonymous = $("#anonEdit").val(entity.anonymous)
      const category = $("#categoryEdit").val(entity.category)
      const details = $("#detailsEdit").val(entity.details)
      if(entity.tags) {
        $('#tagsEdit').tagsinput('add', entity.tags[0])
        entity.tags.forEach((tag, i) => {
          $('#tagsEdit').tagsinput('add', tag);
        })
      }
      if(entity.options) {
        $('#optionsEdit').tagsinput('add', entity.options[0])
        entity.options.forEach((option, i) => {
          $('#optionsEdit').tagsinput('add', option);
        })
      }
      const options = (entity.options) ? entity.options : []
      componentThis.setState({options: options, type: entity.entityType})
    });

    $('#editModal').on('hidden.bs.modal', function () {
        componentThis.setState({options:[], category: 'Classes', type: 'Poll', anonymous: false})
        $('#tagsEdit').tagsinput('removeAll');
        $('#optionsEdit').tagsinput('removeAll');
        $(this).find("input,textarea").val('').end();
    });
  }
  
  getOptions(array) {
    this.setState({options: array})
  }

  onSelectChange(event) {
     if(event.target.value == 'Review') {
      $('#editModal').off('hidden.bs.modal')

      var componentThis = this
    }
    this.setState({type: event.target.value})
  }

  submitToFirebase() {
    //entityType, options, owner, subject, timeLimit, anonymous=false, category
    const entityType = $("#entityTypeEdit").val()  
    const owner = getCurrentUser().email
    const subject = $("#subjectEdit").val()
    var timeLimit = $("#datepickerEdit").datetimepicker("getDate");
    const timeCreatedAt = new Date().toString();
    if(timeLimit) {
      timeLimit = timeLimit.toString();
    }
    let anonymous = $("#anonEdit").val()

    if(anonymous == "on") {
      anonymous = false
    } else {
      anonymous = true
    }
    const category = $("#categoryEdit").val()
    const details = $("#detailsEdit").val()
    const tags = $('#tagsEdit').tagsinput('items');
    const options = $('#optionsEdit').tagsinput('items');
    const optionsToSend = (options) ? options : []
    const entityId = this.props.entityId;

    updateEntity(entityType, optionsToSend, owner, subject, timeLimit, anonymous, category, details, tags, entityId, timeCreatedAt)
  }

  render() {
  	return (
      <div>
        <button data-toggle="modal" data-target="#editModal" className="btn btn-outline-secondary">Edit Post</button>
        <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit Post</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body col-sm-12">
                    <div className="col-sm-12">
                      <form className="form-horizontal" role="form">
                        <fieldset>
                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="subjectEdit">Subject</label>
                            <div className="col-sm-12">
                              <input id="subjectEdit" name="subjectEdit" type="text" placeholder="Insert Post Subject" className="form-control" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="entityTypeEdit">Post Type</label>
                            <div className="col-sm-12">
                              <select id="entityTypeEdit" value={this.state.type} onChange={this.onSelectChange.bind(this)} name="entityTypeEdit" type="text" className="form-control">
                                  <option>Poll</option>
                                  <option>Review</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="categoryEdit">Category</label>
                            <div className="col-sm-12">
                              <select value={this.state.category} id="categoryEdit" onChange={ (event) => { this.setState({category: event.target.value}) } } name="categoryEdit" className="form-control">
                                  <option>Classes</option>
                                  <option>Professors</option>
                                  <option>Events</option>
                                  <option>Food</option>
                                  <option>Concerts</option>
                                  <option>Amusement</option>
                                  <option>Random</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="tagsEdit">Tags</label>
                            <div className="col-sm-12">
                              <input id="tagsEdit" name="tagsEdit" className="form-control" data-role="tagsinput"/>
                            </div>
                          </div>

                          { (this.state.type == 'Poll') ? (
                              <div className="form-group">
                                <label className="col-sm-12 control-label" htmlFor="optionsEdit">Poll Options</label>
                                <div className="col-sm-12">
                                  <input id="optionsEdit" name="optionsEdit" className="form-control" data-role="tagsinput"/>
                                </div>
                              </div>
                            ) : <div></div>
                          }

                           <div className="form-group">
                                <label className="col-sm-12 control-label" htmlFor="anonEdit">Anonymous</label>
                                <div className="col-sm-4">
                                  <input checked={this.state.anonymous} id="anonEdit" onChange={()=>{this.setState({anonymous: !this.state.anonymous})}} name="anonEdit" type="checkbox" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-12 control-label" htmlFor="datepickerEdit">Expiration Date</label>
                                <div className="col-sm-5">
                                  <input name="datepickerEdit" type="text" id="datepickerEdit" className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="detailsEdit">Description</label>
                            <div className="col-sm-12">
                              <div style={{padding: "0"}} className="col-sm-12">
                                    <textarea name="descEdit" className="form-control col-sm-12" rows="5" id="detailsEdit"></textarea>
                                </div>
                            </div>
                          </div>
                        </fieldset>
                      </form>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button data-dismiss="modal" onClick={this.submitToFirebase.bind(this)} type="button" className="btn btn-primary">Update</button>
              </div>
            </div>
          </div>
        </div>
  	)
  }
}

