import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EditReviewModal from '../edit-review-modal'

export default class EntityReview extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var owner = (this.props.review.anonymous) ? 'Anonymous' : this.props.review.reviewerEmail;
        var disable = (this.props.user !== null && !this.props.expired) ? false : true
        var userEmail = (this.props.user !== null) ? this.props.user.email : ""
        var reviewText = (this.props.review.review) ? this.props.review.review : ""
        var numStars = (this.props.review.stars) ? parseInt(this.props.review.stars) : 0
        var stars = []
        for(var i = 0; i < 5; i++) {
            if(i < numStars) {
                stars.push(<i key={i} className="fa fa-star" style={{color:"#FD4"}} aria-hidden="true"></i>)
            } else {
                stars.push(<i key={i} className="fa fa-star-o" style={{color:"grey"}} aria-hidden="true"></i>)
            }
        }
        return (
            <div className="row">
                <div className="card card-fill col-sm-12">
                    <div className="card-title">
                        <span className="pull-left"><strong>{owner}</strong></span>
                        <div className="pull-left" style={{marginLeft:"10px"}} >
                            <span style={{float:"right"}} > 
                                {
                                    stars.map((star, key) => {
                                        return star
                                    })
                                }
                            </span>
                        </div>
                        <span className="pull-right">
                            {
                                (!disable && this.props.review.reviewerEmail === userEmail) ? (
                                    <EditReviewModal
                                        user={this.props.user}
                                        entity={this.props.entity}
                                        createEntityReview={this.props.createEntityReview}
                                        checkReviewExists={this.props.checkReviewExists}
                                        entityId={this.props.entityId}
                                        numStars={numStars}
                                        reviewText={reviewText}
                                        anon={this.props.review.anonymous}
                                    />
                                ) : (
                                    <div></div>
                                )
                            }
                        </span> 
                    </div>
                    <div className="card-text">
                        <i className="fa fa-commenting-o" aria-hidden="true" style={{color:"darkGrey"}}></i> {reviewText}
                    </div>
                </div>
            </div>
        )
    }
}