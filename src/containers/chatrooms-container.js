import React, { Component } from 'react';
import { connect } from 'react-redux'
import {createChatroom, createChatroomMessage} from '../firebase'

class Chatrooms extends Component {
	constructor(props) {
    	super(props);
    	this.state = {messageText:"", createChatroomText:"", currentChatroom:""}
  	}
  	handleSubmit(event) {
  		event.preventDefault();
  		createChatroom(this.state.createChatroomText)
      this.setState({createChatroomText:""})
  	}
    handleMessageSubmit(event) {
      event.preventDefault();
      createChatroomMessage(this.state.currentChatroom, this.props.user.email, this.state.messageText)
      this.setState({messageText:""})
    }
    onCreateChatroomChange(event) {
      this.setState({createChatroomText:event.target.value})
    }
    onMessageChange(event) {
      this.setState({messageText:event.target.value})
    }
    onSelectChange(event) {
      this.setState({currentChatroom:event.target.value})
    }
    componentWillMount() {
      if(!this.state.currentChatroom != "" && this.props.chatrooms) {
        this.setState({currentChatroom:(Object.keys(this.props.chatrooms))[0]})
      }  
    }
    componentWillReceiveProps() {
      if(!this.state.currentChatroom != "" && this.props.chatrooms) {
        this.setState({currentChatroom:(Object.keys(this.props.chatrooms))[0]})
      }  
    }
  	render() {
      
      var currentChatroomObject = this.props.chatrooms[this.state.currentChatroom]
  		return (
  			<div>
  				<form onSubmit={this.handleSubmit.bind(this)}>
	  				<input onChange={this.onCreateChatroomChange.bind(this)} style={{marginTop:"15px", width:"100%"}} value={this.state.createChatroomText}placeholder="Create Chatroom" type="text"/>
  				</form>
	    		<select onChange={this.onSelectChange.bind(this)} style={{marginTop:"15px", width:"100%"}} name="" id="">
            {
              (this.props.chatrooms) ? (Object.keys(this.props.chatrooms).map(function(chatroom, index) {
                return <option key={index} value={chatroom}>{chatroom}</option>
              })) : <option value="">No Chatroom Available</option>
            }
	    		</select>
	    		<div style={{background:"#eee9e9", overflowY:"auto", height:"74vh"}}>
	    			{
              (currentChatroomObject) ? (
                Object.values(currentChatroomObject.messages).map(function(message, id) {
                  var tempAuthor = message.author;
                  var tempMessage = message.message;
                  return <p style={{paddingTop:"8px", marginLeft:"9px"}} key={id}><span style={{fontWeight:"bold"}}>{tempAuthor}</span>: {tempMessage}</p>
                })
              ):<div></div>
            }
	    		</div>
          <form onSubmit={this.handleMessageSubmit.bind(this)}>
	    		 {
              currentChatroomObject ? (
                  <input onChange={this.onMessageChange.bind(this)} value={this.state.messageText} placeholder="Type Message Here" style={{width:"100%"}} type="text"/> 
              ) : (
                <input placeholder="Type Message Here" style={{width:"100%"}} type="text" disabled /> 
              )
            }
          </form>
	    	</div>
  		)
 	}
}

function mapStateToProps(state) {
  return {
    chatrooms: state.chatrooms,
    user: state.loginInfo,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(Chatrooms);