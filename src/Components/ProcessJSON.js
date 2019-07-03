import React from 'react';
import translateGoogleSheet from '../Utilities/translateGoogleSheet'

class ProcessJSON extends React.Component {
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		message: 'No Meetings Loaded',
		}
	}

	processSource() {
		if(this.props.state.src) {
			fetch(this.props.state.src).then(result => { return result.json(); }).then(result => {
				//for readability
				let meetings = result;

				//if Google Sheet, translate to Meeting Guide spec JSON
				if (this.props.state.src.includes('spreadsheets.google.com')) {
					meetings = translateGoogleSheet(meetings);
				}

				//check for any meetings with arrays of days and creates an individual meeting for each day in array
				let meetings_to_add = [];
				let indexes_to_remove =[];

				for (let i=0; i < meetings.length; i++) {
					
					//for readability
					let meeting = meetings[i]; 

					if (Array.isArray(meeting.day)) {
						indexes_to_remove.push(i);
						meeting.day.forEach(function(single_day) {
							let temp_meeting = Object.assign({}, meeting);
							temp_meeting.day = single_day;
							temp_meeting.slug = meeting.slug + "-" + single_day;
							meetings_to_add.push(temp_meeting);
						});
					}
				}

				for (let i=0; i < indexes_to_remove.length; i++) {
					meetings = meetings.splice(indexes_to_remove[i], 1);
				}

				meetings = meetings.concat(meetings_to_add);

				//lookups to be used in below loop for day and types processing
				const lookups = this.props.state.settings.lookups[this.props.state.settings.language];
				const lookup_day = this.props.state.settings.days.map(day => lookups.days[day])
				const lookup_type = {};
				for (let code in lookups.types) {
					lookup_type[lookups.types[code]] = code;
				}

				//process meetings into correct format based on Meeting Guide spec
				for (let i = 0; i < meetings.length; i++) {

					//for readability
					let meeting = meetings[i];

					//format day
					if (Number.isInteger(meeting.day)) {
						//convert day to string if integer
						meeting.day = meeting.day.toString();
					} else if (lookup_day.includes(meeting.day)) {
						meeting.day = lookup_day.indexOf(meeting.day).toString();
					}

					//format types
					if (meeting.types) {
						meeting.types = meeting.types.map(type => type.trim()).filter(type => type.length);
						for (let j = 0; j < meeting.types.length; j++) {
							if (meeting.types[j] in lookup_type) {
								meeting.types[j] = lookup_type[meeting.types[j]];
							}
						}
						meeting.types = meeting.types.filter(type => type in lookups.types).sort();
					}
				}

				//TODO: deconstruct formatted_address to get city

				//????: how to deal with region

				//resets source to empty string so processSource() doesn't keep getting called every time state changes
				this.props.setAppState("src", "");
				//updates app meetings state
				this.props.setAppState("meetings", meetings);
				//display message for testing
				this.setState({message: 'Meetings Loaded'});
			});	
		}
		
  	}

  	render () {
  		this.processSource();

  		return (
  			<div className="ProcessJSON">
 				Meetings Status: {this.state.message}
  			</div>
  		)
  	}
  }


export default ProcessJSON;
