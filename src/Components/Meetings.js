import React from 'react';

import meetingsProcess from '../Utilities/meetingsProcess';
import meetingsToLatex from '../Utilities/meetingsToLatex';

// Component for loading a source of Meetings and selecting its print settings
class Meetings extends React.Component {
  constructor(props) {
    super(props);
    // intialized to Cataret County Google Sheet for testing purposes
    this.state = {
      settings: {},
      source: 'https://spreadsheets.google.com/feeds/list/1prbiXHu9JS5eREkYgBQkxlkJELRHqrKz6-_PLGPWIWk/1/public/values?alt=json',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //update state when textbox input changes
  handleChange(event) {
    this.setState({src: event.target.value});
  }

  //update app state src on form submit
  handleSubmit(event) {
    let temp = this.props.state.latex;
    temp.push(meetingsToLatex(this.props.state, this.state, meetingsProcess(this.props.state, this.state)));
    this.props.setAppState('latex', temp);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Meetings">
        <form onSubmit={this.handleSubmit}>
          <label>
            JSON URL:
            <input className="Meetings-input" type="text" size="60" value={this.state.src} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Load Meetings" />
        </form>
      </div>
    );
  }
}

export default Meetings;