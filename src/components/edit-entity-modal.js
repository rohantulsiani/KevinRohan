import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import PollOptions from './modal-components/poll-options'
import { addEntity, getCurrentUser } from '../firebase'

export default class EditEntityModal extends Component {
  constructor(props) {
      super(props)

      this.state = {
        type: 'Poll',
        category: 'Sports',
        anonymous: false,
        options: []
      }
  }

  componentDidMount() {
    var componentThis = this
    $('#editModal').on('hidden.bs.modal', function () {
        componentThis.setState({options:[], category: 'Sports', type: 'Poll', anonymous: false})
        $('#tagsEdit').tagsinput('removeAll');
        $(this).find("input,textarea").val('').end();
    });
    $('#datepickerEdit').datepicker()
  }
  
  getOptions(array) {
    this.setState({options: array})
  }

  onSelectChange(event) {
     if(event.target.value == 'Review') {
      $('#editModal').off('hidden.bs.modal')

      var componentThis = this
      
      $('#editModal').on('hidden.bs.modal', function () {
        componentThis.setState({category: 'Sports', type: 'Poll', anonymous: false})
        $(this).find("input,textarea").val('').end();
      });
    }

    this.setState({type: event.target.value})
  }

  submitToFirebase() {
    //entityType, options, owner, subject, timeLimit, anonymous=false, category
    const entityType = $("#entityType").val()
  
    let options = null
    
    if(entityType == "Poll") {
      options = this.state.options
    }
    
    const owner = getCurrentUser().email
    const subject = $("#subjectEdit").val()
    const timeLimit = $("#datepickerEdit").val()
    let anonymous = $("#anonEdit").val()

    if(anonymous == "on") {
      anonymous = false
    } else {
      anonymous = true
    }
    const category = $("#categoryEdit").val()
    const details = $("#detailsEdit").val()
    const tags = $('#tagsEdit').tagsinput('items');

    addEntity(entityType, options, owner, subject, timeLimit, anonymous, category, details, tags)
  }

  render() {
    // if(!this.props.isLoggedIn) {
    //   return <div></div>
    // }
    
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
                            <label className="col-sm-12 control-label" htmlFor="subject">Subject</label>
                            <div className="col-sm-12">
                              <input id="subjectEdit" name="subject" type="text" placeholder="Insert Post Subject" className="form-control" />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="entityTypeSelect">Post Type</label>
                            <div className="col-sm-12">
                              <select id="entityTypeEdit" value={this.state.type} onChange={this.onSelectChange.bind(this)} name="entityTypeSelect" type="text" className="form-control">
                                  <option>Poll</option>
                                  <option>Review</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="categorySelect">Category</label>
                            <div className="col-sm-12">
                              <select value={this.state.category} id="categoryEdit" onChange={ (event) => { this.setState({category: event.target.value}) } } name="categorySelect" className="form-control">
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
                            <label className="col-sm-12 control-label" htmlFor="categorySelect">Tags</label>
                            <div className="col-sm-12">
                              <input id="tagsEdit" name="tags" placeholder="Insert Tags" className="form-control" data-role="tagsinput"/>
                            </div>
                          </div>

                          { (this.state.type == 'Poll') ? (
                              <PollOptions getOptions={(array)=>{this.getOptions(array)}} />
                            ) : <div></div>
                          }

                           <div className="form-group">
                                <label className="col-sm-2 control-label" htmlFor="anon">Anonymous</label>
                                <div className="col-sm-4">
                                  <input checked={this.state.anonymous} id="anonEdit" onChange={()=>{this.setState({anonymous: !this.state.anonymous})}} name="anon" type="checkbox" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-sm-12 control-label" htmlFor="datepicker">Expiration Date</label>
                                <div className="col-sm-5">
                                  <input name="datepicker" type="text" id="datepickerEdit" className="form-control"></input>
                                </div>
                            </div>

                            <div className="form-group">
                            <label className="col-sm-12 control-label" htmlFor="desc">Description</label>
                            <div className="col-sm-12">
                              <div style={{padding: "0"}} className="col-sm-12">
                                    <textarea name="desc" className="form-control col-sm-12" rows="5" id="detailsEdit"></textarea>
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
                <button data-dismiss="modal" onClick={this.submitToFirebase.bind(this)} type="button" className="btn btn-primary">Post</button>
              </div>
            </div>
          </div>
        </div>
  	)
  }
}

