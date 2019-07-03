import React from 'react';

import SourceForm from './Components/SourceForm'
import ProcessJSON from './Components/ProcessJSON'
import GenerateBooklet from './Components/GenerateBooklet'

import settings from './settings';

class App extends React.Component{
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		src: '',
	  		meetings: [],
	  		settings: settings,
		}

		this.setAppState = this.setAppState.bind(this);
	}

	//function for components to set global state
	setAppState(key, value) {
		this.setState({ [key]: value });		
	}

	render() {
	  	return (
		    <div className="App">
		    	<header className="App-header">
		    		<h1>Booklet Generator</h1>
		    	</header>
		    	<SourceForm setAppState = {this.setAppState} />
		    	<ProcessJSON state={this.state} setAppState = {this.setAppState} />
		    </div>
		);
	}
}

export default App;
