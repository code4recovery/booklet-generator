import React from 'react';

import meetingsProcess from '../Utilities/meetingsProcess';

// Component for loading a source of Meetings and selecting its print settings
class Meetings extends React.Component {
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
    this.setState({source: event.target.value});
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
    let load_message_class = "Meetings-input btn btn-warning";
    if (this.state.errors.length) {
      load_message_class = "Meetings-input btn btn-danger";
    } else if (this.state.latex) {
      load_message_class = "Meetings-input btn btn-success";
    }


    return (
      <div className="Meetings">
        <h2>Add Meetings</h2>
        <h3 className={this.state.errors.length ? 'App-error' : 'App-error-hidden'}>Error Message:</h3>
        <h3>Edit Settings:</h3>
        <h3>Set Source:</h3>
        <div className="App-content">
          <form id={this.props.label} onSubmit={this.handleSubmit}>
            <label>
              Enter JSON Feed URL:
              <input className="Meetings-input" type="text" size="60" value={this.state.source} onChange={this.handleChange} />
            </label>
          </form>
        </div>
        <h3>Load Settings and Source:</h3>
        <div className="App-content">
          <button type="submit" className="Meetings-input btn btn-primary" form={this.props.label}>Load Meetings</button>
          <button type="button" className={load_message_class} disabled>{this.state.load_message}</button>
        </div>
      </div>
    );
  }
}

export default Meetings;