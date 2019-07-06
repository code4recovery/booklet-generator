import React from 'react';

import generatePDF from '../Utilities/generate/generatePDF'

//import settings from '../settings';

// The main App
export default class Generate extends React.Component{
	constructor(props) {
	    super(props);

	    this.handleSubmitPDF = this.handleSubmitPDF.bind(this);
	    this.handleSubmitLatex = this.handleSubmitLatex.bind(this);
	    this.handleSubmitConfig = this.handleSubmitConfig.bind(this);
  	}

	//update app state source on submit
	handleSubmitPDF(event) {
	    console.log("Generate PDF");
	   	generatePDF(this.props.state);
	    event.preventDefault();
	}

	handleSubmitLatex(event) {
    	console.log("Generate Latex");
    	//generateLatex(this.props.state);
    	event.preventDefault();
  	}

   handleSubmitConfig(event) {
   		console.log("Generate Config");
   		//generateConfig(this.props.state);
   		event.preventDefault();
  	}

  render() {
    return (
    	<div className="Generate">
	        <form onSubmit={this.handleSubmitPDF} className="Generate-form">
	          <button type="submit" className="Generate-button btn btn-outline-primary">Generate PDF</button>
	        </form>
	       	<form onSubmit={this.handleSubmitLatex} className="Generate-form">
	          <button type="submit" className="Generate-button btn btn-outline-secondary">Generate LaTeX</button>
	        </form>
			<form onSubmit={this.handleSubmitConfig} className="Generate-form">
	          <button type="submit" className="Generate-button btn btn-outline-secondary">Generate Config File</button>
	        </form>
    	</div>
    );
  }
}