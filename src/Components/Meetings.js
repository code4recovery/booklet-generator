import React from 'react';

import meetingsProcess from '../Utilities/meetings/meetingsProcess';

// Component for loading a source of Meetings and selecting its print settings
export default class Meetings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: [],
      latex: "",
      load_message: 'Current Settings and Source Not Loaded',
      settings: {},
       // intialized to Cataret County Google Sheet for testing purposes
      source: 'https://spreadsheets.google.com/feeds/list/1prbiXHu9JS5eREkYgBQkxlkJELRHqrKz6-_PLGPWIWk/1/public/values?alt=json',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMeetingsState = this.setMeetingsState.bind(this);
  }

  //update state when textbox input changes
  handleChange(event) {
    this.setState({source: event.target.value, latex: '', load_message: 'Current Settings and Source Not Loaded'});
  }

  //processes meetings and creates latex and then updates item state with App
  handleSubmit = (event) => {
    meetingsProcess(this.props.state, this.state, this.setMeetingsState, () => {
        let items = this.props.state.items;
        items[this.props.label] = this.state;
        this.props.setAppState('items', items);
      } 
    );
    event.preventDefault();
  }

  //function for components to set Meetings state
  setMeetingsState(key, value) {
    this.setState({ [key]: value });    
  }

  render() {

    // sets load_message_class depending on state of Meetings
    let load_message_class = "Meetings-button btn btn-warning";
    if (this.state.errors.length) {
      load_message_class = "Meetings-button btn btn-danger";
    } else if (this.state.latex) {
      load_message_class = "Meetings-button btn btn-success";
    }

    return (
      <div className="Meetings">
        <h2>Add Meetings</h2>
        <h3>Set Source:</h3>
        <form className="App-content" id={this.props.label} onSubmit={this.handleSubmit}>
          <label className="Meetings-source-lable">Enter JSON Feed URL:</label>
          <input className="Meetings-source-input" type="text" value={this.state.source} onChange={this.handleChange} />
        </form>
        <h3>Edit Settings:</h3>
        <h3>Load Settings and Source:</h3>
        <div className="App-content">
          <button type="submit" className="Meetings-button btn btn-primary" form={this.props.label}>Load</button>
          <button type="button" className={load_message_class} disabled>{this.state.load_message}</button>
          <p className="App-note">*Any change to the settings or source requires reloading</p>
        </div>
        <h3 className={this.state.errors.length ? 'App-error' : 'App-error-hidden'}>Error Message:</h3>
      </div>
    );
  }
}