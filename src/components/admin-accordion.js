import React, {Component} from 'react'
import {removeEntity} from '../firebase'

export default class AdminAccordion extends Component {
	constructor(props) {
		super(props)
	}

	deleteButtonClicked() {
		removeEntity(this.props.entityId)
	}

	render() {
		return (<div id="accordion">
            <div className="card">
              <div className="card-header">
                <h5 style={{padding:"0", margin:"0"}} className="col-sm-12">
                	<div className="col-sm-12">
	                  <a style={{display:"inline", textDecoration:"none"}} className="collapsed" data-toggle="collapse" href={`#${this.props.entityId}`}>
	                    {this.props.entity.subject}
	                  </a>
	                  <i onClick={this.deleteButtonClicked.bind(this)} style={{cursor:"pointer", display:"inline-block", color:"red", float:"right"}} className="fa fa-minus-circle"></i>
	             	</div>
                </h5>
              </div>
            <div id={this.props.entityId} className="collapse">
          <div>
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
        </div>
    	</div>
  	</div>)
	}
}