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
		// $(function () {
		//    $('.panel-google-plus > .panel-footer > .input-placeholder, .panel-google-plus > .panel-google-plus-comment > .panel-google-plus-textarea > buttontype="reset"').on('click', function(event) {
		//         var $panel = $(this).closest('.panel-google-plus');
		//             $comment = $panel.find('.panel-google-plus-comment');
		            
		//         $comment.find('.btn:first-child').addClass('disabled');
		//         $comment.find('textarea').val('');
		        
		//         $panel.toggleClass('panel-google-plus-show-comment');
		        
		//         if ($panel.hasClass('panel-google-plus-show-comment')) {
		//             $comment.find('textarea').focus();
		//         }
		//    });
		//    $('.panel-google-plus-comment > .panel-google-plus-textarea > textarea').on('keyup', function(event) {
		//         var $comment = $(this).closest('.panel-google-plus-comment');
		        
		//         $comment.find('buttontype="submit"').addClass('disabled');
		//         if ($(this).val().length >= 1) {
		//             $comment.find('buttontype="submit"').removeClass('disabled');
		//         }
		//    });
		// });
	}

	render() {
		 console.log(this.props.entity.owner)
		 var nameOfEntity = this.props.entity.subject;
		 var typeOfEntity = this.props.entity.entityType;
		 var anonymous = '';
		 if(this.props.entity.anonymous){
		 	anonymous = 'Anonymous';
		 }
		 else{
		 	anonymous = this.props.entity.owner;
		 }

		return (
			<div className="col-sm-12 col-md-4">
	            <div className="panel panel-default panel-google-plus">
	                <div className="panel-google-plus-tags">
	                    <ul>
	                        <li>{this.props.entity.category}</li>
	                    </ul>
	                </div>
	                <div className="panel-heading">
	                    <img className=" img-circle pull-left " src="https://lh3.googleusercontent.com/-CxXg7_7ylq4/AAAAAAAAAAI/AAAAAAAAAQ8/LhCIKQC5Aq4/s46-c-k-no/photo.jpg" alt="Mouse0270" />
	                    <h3>{nameOfEntity}</h3>
	                    <h5><span>{typeOfEntity}</span> - <span>{anonymous}</span> </h5>
	                </div>
	                <div className="panel-body">
	                    <p>Team Galactic #1</p>
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