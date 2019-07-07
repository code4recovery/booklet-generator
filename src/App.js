import React from 'react';

import Meetings from './Components/Meetings';
import Generate from './Components/Generate';

import settings from './settings';

// The main App
export default class App extends React.Component{
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		// need to update each time Generate button is submitted
	  		// label : itemState (with itemState.latex as a property)
	  		items: {},
	  		settings: settings,
		}

		this.setAppState = this.setAppState.bind(this);
	}

	//function for components to set App state
	setAppState(key, value) {
		this.setState({ [key]: value });		
	}

	render() {
	  	return (
		    <div className="App">
		    	<header className="App-header">
		    		<h1>Booklet Generator</h1>
		    		<p className="App-subtitle">A tool to turn a Meeting Guide format JSON feed into a print optimized PDF for the production of paper meeting booklets.</p>
		    		<Generate state = {this.state} /> 
		    	</header>
		    	<Meetings state = {this.state} setAppState = {this.setAppState} label="meeting1" />
		    </div>
		);
	}
}
