import React from 'react';

class ProcessJSON extends React.Component {
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		meetings: [],
	  		message: 'No Meetings Loaded'
		}
	}

	processSource() {
		if(this.props.src) {
			fetch(this.props.src).then(result => { return result.json(); }).then(result => {
				let meetings = result;
				if (this.props.src.includes('spreadsheets.google.com')) {
					//meetings = translateGoogleSheet(meetings);
				}
				this.props.updateMeetings(meetings);
				this.setState({meetings: meetings, message: 'Meetings Loaded'});
			});	
		}
		
  	}

  	render () {
  		this.processSource();

  		return (
  			<div className="ProcessJSON">
 				Meetings: {this.state.message}
  			</div>
  		)
  	}
  }


export default ProcessJSON;
