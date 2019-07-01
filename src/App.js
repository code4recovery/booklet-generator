import React from 'react';

import SourceForm from './Components/SourceForm'
import ProcessJSON from './Components/ProcessJSON'
import GenerateBooklet from './Components/GenerateBooklet'

class App extends React.Component{
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		src: '',
	  		meetings: [],
	  		config: {}
		}

		this.updateMeetings = this.updateMeetings.bind(this);
		this.updateSource = this.updateSource.bind(this);
	}

	updateMeetings(meetings) {
		this.setState({
			meetings: meetings
		})
	}

	updateSource(src) {
		this.setState({ src: src });
	}



	render() {
	  	return (
		    <div className="App">
		    	<header className="App-header">
		    		<h1>Booklet Generator</h1>
		    	</header>
		    	<SourceForm updateSource = {this.updateSource} />
		    	<ProcessJSON updateMeetings = {this.updateMeetings} src = {this.state.src} />
		    </div>
		);
	}
}

export default App;
