import React from 'react';

//import settings from '../settings';

// The main App
class Generate extends React.Component{
	constructor(props) {
	    super(props);

	    this.handleSubmitPDF = this.handleSubmitPDF.bind(this);
	    this.handleSubmitLatex = this.handleSubmitLatex.bind(this);
	    this.handleSubmitConfig = this.handleSubmitConfig.bind(this);
  	}

	//update app state source on submit
	handleSubmitPDF(event) {
	    console.log("Generate PDF");
	   	//generatePDF(this.props.state);
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
	          <button type="submit" className="Generate-button btn btn-dark">Generate PDF</button>
	        </form>
	       	<form onSubmit={this.handleSubmitLatex} className="Generate-form">
	          <button type="submit" className="Generate-button btn btn-dark">Generate LaTeX</button>
	        </form>
			<form onSubmit={this.handleSubmitConfig} className="Generate-form">
	          <button type="submit" className="Generate-button btn btn-dark">Generate Config</button>
	        </form>
    	</div>
    );
  }
}

export default Generate;

