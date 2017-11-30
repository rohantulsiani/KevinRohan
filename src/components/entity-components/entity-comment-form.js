import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { notifyUserOfTag } from '../../firebase'

export default class EntityCommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            taggedUsers:[],
            anon: false,
            image: null,
            imageName: null
        }
    }

    anonSwitch(e) {
        this.setState({
            anon: !this.state.anon
        })
    }

    updateProgress(percentage)
    {  
        console.log("here");
        console.log(percentage);
        this.setState({progress: percentage});
    }

    submitComment(e) {
        e.preventDefault()
        this.props.createEntityComment(
            this.props.entity.entityType,
            this.props.entityId,
            this.state.text,
            this.props.user.uid,
            this.props.user.email,
            this.state.anon,
            this.state.image,
            this
        );
        for(var i = 0; i < this.state.taggedUsers.length; i++) {
            var user = this.state.taggedUsers[i]
            for(var j = 0; j < Object.keys(this.props.users).length; j++) {
                var userKey = (Object.keys(this.props.users))[j]
                var userObj = this.props.users[userKey]
                
                if(userObj.email == user) {
                    var entityParam = this.props.entity
                    var yourUserParam = this.props.user

                    notifyUserOfTag(yourUserParam, userKey, entityParam);
                }
            }
        }

    }

    textAreaOnChange(event) {
        this.setState({text: event.target.value})
        this.getTags(event.target.value)
    }

    getTags(text) {
        var str = text
        var res = str.match(/\([^\)]*\)/g)

        if(!res) return;
        let arr = []
        for(var i = 0; i < res.length; i++) {
            var email = res[i].substr(1, res[i].length - 2)
            arr.push(email);
        }

        this.setState({taggedUsers:arr})
    }

    uploadImage(e){
        var file = e.target.files[0];
        this.setState({image: file, imageName: file.name});
    }

    render() {
        const disable = (this.props.user !== null && !this.props.expired) ? false : true
        return (
            <div className="container-fluid">
              <div style={{margin: "0 auto"}}>
              </div>
             <textarea disabled={disable} name="review" className="form-control col-sm-12" rows="3" id="reviews" style={{marginTop: "20px"}} disabled={this.props.disabled} onChange={this.textAreaOnChange.bind(this)}></textarea>
                <label><input disabled={disable} onClick={(e)=>{this.anonSwitch(e)}} type="checkbox" value={this.state.anon} /> Anonymous</label>
                <br/>
                <label className="custom-file-upload" htmlFor="file-upload" style={{cursor: 'pointer'}} >
                     <i className="fa fa-picture-o" aria-hidden="true"></i> Upload Image
               </label>
                <input id="file-upload"  type="file" style = {{display: "none"}} accept="image/*" disabled={this.props.disabled}
                    onChange = {(e)=> this.uploadImage(e)}/> 
                
                <p>{this.state.imageName}</p>
              <button disabled={disable} style={{marginTop:"10px"}} onClick={ (e) => {this.submitComment(e)}} type="button" className="btn btn-primary">Comment</button>  
            </div>
        )
    }
}