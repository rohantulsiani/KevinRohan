import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

export default class EntityCard extends Component {
	constructor(props) {
		super(props)

		this.state = {
			entity: null
		}
	}

	componentDidMount() {
		$(function () {
		   $('.panel-google-plus > .panel-footer > .input-placeholder, .panel-google-plus > .panel-google-plus-comment > .panel-google-plus-textarea > buttontype="reset"').on('click', function(event) {
		        var $panel = $(this).closest('.panel-google-plus');
		            $comment = $panel.find('.panel-google-plus-comment');
		            
		        $comment.find('.btn:first-child').addClass('disabled');
		        $comment.find('textarea').val('');
		        
		        $panel.toggleClass('panel-google-plus-show-comment');
		        
		        if ($panel.hasClass('panel-google-plus-show-comment')) {
		            $comment.find('textarea').focus();
		        }
		   });
		   $('.panel-google-plus-comment > .panel-google-plus-textarea > textarea').on('keyup', function(event) {
		        var $comment = $(this).closest('.panel-google-plus-comment');
		        
		        $comment.find('buttontype="submit"').addClass('disabled');
		        if ($(this).val().length >= 1) {
		            $comment.find('buttontype="submit"').removeClass('disabled');
		        }
		   });
		});
	}

	render() {
		console.log(this.props.entity)
		return (
			<div className="col-sm-12 col-md-4 col-lg-3">
				



            <div className="panel panel-default panel-google-plus">
                <div className="dropdown">
                    <span className="dropdown-toggle" type="button" data-toggle="dropdown">
                        <span className=" glyphicon glyphicon-chevron-down "></span>
                    </span>
                    <ul className="dropdown-menu" role="menu">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                        <li role="presentation" className="divider"></li>		
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                </div>
                <div className="panel-google-plus-tags">
                    <ul>
                        <li>#Millennials</li>
                        <li>#Generation</li>
                    </ul>
                </div>
                <div className="panel-heading">
                    <img className=" img-circle pull-left " src="https://lh3.googleusercontent.com/-CxXg7_7ylq4/AAAAAAAAAAI/AAAAAAAAAQ8/LhCIKQC5Aq4/s46-c-k-no/photo.jpg" alt="Mouse0270" />
                    <h3>Robert McIntosh</h3>
                    <h5><span>Shared publicly</span> - <span>Jun 27, 2014</span> </h5>
                </div>
                <div className="panel-body">
                    <p>Do people born in 2000 get to choose if they are Generation Y or Generation Z? How do you decide what generation you want to belong to?</p>
                </div>
                <div className="panel-footer">
                    <button type="button" className=" btn btn-default ">+1</button>
                    <button type="button" className=" btn btn-default ">
                        <span className=" glyphicon glyphicon-share-alt "></span>
                    </button>
                    <div className="input-placeholder">Add a comment...</div>
                </div>
                <div className="panel-google-plus-comment">
                    <img className="img-circle" src="https://lh3.googleusercontent.com/uFp_tsTJboUY7kue5XAsGA=s46" alt="User Image" />
                    <div className="panel-google-plus-textarea">
                        <textarea rows="4"></textarea>
                        <button type="submit" className=" btn btn-success disabled ">Post comment</button>
                        <button type="reset" className=" btn btn-default ">Cancel</button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>








			</div>
		)
	}
}