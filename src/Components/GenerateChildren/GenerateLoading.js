import React from 'react';

import gif from './loading.gif'; 

export default class GenerateLoading extends React.Component{
  	render() {
  		let download_display_class = "GenerateLoading-download-false";
  		if (this.props.state.download) {
  			download_display_class = "GenerateLoading-download-true";
  		}

  		if (this.props.state.loading) {
  			return (
	  			<div className="GenerateLoading-true">
	  				<img src={gif} alt="Loading..." height="128px" width="128px" />
	  			</div>
  			)
  		}
  		// need to deal with including filename extension for latex and config files
  		else {
  			return (
	  			<div className={download_display_class}>
	  				<a href={this.props.state.download} download="booklet-generator">
		  				<button type="button" className="btn btn-success">
		  					Download {this.props.state.filetype}
	  					</button>
  					</a>
	  			</div>
  			)
  		}
  	}
}
