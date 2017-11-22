import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EditPollModal from '../edit-poll-modal'

export default class EntityPoll extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var owner = (this.props.poll.anonymous) ? 'Anonymous' : this.props.poll.posterEmail;
        var disable = (this.props.user !== null && !this.props.expired) ? false : true
        var userEmail = (this.props.user !== null) ? this.props.user.email : ""
        var option = (this.props.poll.option) ? this.props.poll.option : ""
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title">
                        <strong>{owner}</strong>
                        <span className="pull-right">
                            {
                                (!disable && this.props.poll.posterEmail === userEmail) ? (
                                    <EditPollModal
                                        user={this.props.user}
                                        entity={this.props.entity}
                                        createPollResponse={this.props.createPollResponse}
                                        checkPollResponseExists={this.props.checkPollResponseExists}
                                        entityId={this.props.entityId}
                                        selectedOption={option}
                                        anon={this.props.poll.anonymous}
                                    />
                                ) : (
                                    <div></div>
                                )
                            }
                        </span> 
                    </div>
                    <div className="card-text"><i className="fa fa-dot-circle-o" aria-hidden="true" style={{color:"darkGrey"}}></i> {option}</div>
                </div>
            </div>
        )
    }
}