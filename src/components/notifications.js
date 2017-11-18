import React, { Component } from 'react';
import { setNotificationCount } from '../firebase';

export default class Notifications extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
			var user = this.props.user;
			$('#noti_Button').click(function () {
            // TOGGLE (SHOW OR HIDE) NOTIFICATION WINDOW.
            $('#notifications').fadeToggle('fast', 'linear', null);
            setNotificationCount(user.uid, 0);
			
            return false;
        });

        $('#notifications').click(function () {
            return false;       // DO NOTHING WHEN CONTAINER IS CLICKED.
        });
	}

	render() {

		return (
			<div style={{margin:0, padding:0}}>
		        <ul id="notification-container">
		            <li id="noti_Container">
		                <div id="noti_Counter">{this.props.user ? this.props.user.notificationCount : ""}</div>  
		                
		                <div id="noti_Button"><i className="fa fa-bell"></i></div>    
			
		                <div id="notifications">
		                    <h3>Notifications</h3>
		                    <div style={{height:"300px"}}>
								<ul>
									{
										this.props.user.notifications ? (Object.values(this.props.user.notifications).map(function(notification, index) {
											return (<li key={index}>{notification}</li>)
										})):<div></div>
									}
								</ul>
		                    </div>
		                </div>
		            </li>
		        </ul>
	    </div>
		);
	}
}