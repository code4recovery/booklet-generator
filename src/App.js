import React from 'react';

import Meetings from './Components/Meetings';

import settings from './settings';

class App extends React.Component{
	constructor(props) {
	  	super(props);
	  	
	  	this.state = {
	  		latex: [],
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
		    	<Meetings state = {this.state} setAppState = {this.setAppState} />
		    </div>
		);
	}
}

export default App;
