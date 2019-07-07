import React from 'react';

import GenerateLoading from './GenerateChildren/GenerateLoading'

import generatePDF from '../Utilities/generate/generatePDF'

//import settings from '../settings';

// Generate PDF, Latex, and Config File functionality
export default class Generate extends React.Component{
	constructor(props) {
	    super(props);

	    this.state = {
	    	download: '',
	    	filetype: '',
			loading: false,
	    }

	    this.handleSubmitPDF = this.handleSubmitPDF.bind(this);
	    this.handleSubmitLatex = this.handleSubmitLatex.bind(this);
	    this.handleSubmitConfig = this.handleSubmitConfig.bind(this);
	    this.setGenerateState = this.setGenerateState.bind(this);
  	}

	//update app state source on submit
	handleSubmitPDF(event) {
		this.setState({loading: true, filetype: "PDF"});
	   	generatePDF(this.props.state, this.setGenerateState);
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

  	setGenerateState(key, value) {
		this.setState({ [key]: value });		
	}

  	render() {
	    return (
	    	<div className="Generate">
		        <form onSubmit={this.handleSubmitPDF} className="Generate-form">
		          <button type="submit" className="Generate-button btn btn-outline-primary">Generate PDF</button>
		        </form>
		       	<form onSubmit={this.handleSubmitLatex} className="Generate-form">
		          <button type="submit" className="Generate-button btn btn-outline-primary">Generate LaTeX</button>
		        </form>
				<form onSubmit={this.handleSubmitConfig} className="Generate-form">
		          <button type="submit" className="Generate-button btn btn-outline-primary">Generate Config File</button>
		        </form>
		        <GenerateLoading state={this.state} />
	    	</div>
	    );
	}
}