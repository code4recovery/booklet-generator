import React from 'react';

class SourceForm extends React.Component {
  constructor(props) {
    super(props);
    // intialized to Cataret County Google Sheet for testing purposes
    this.state = {src: 'https://spreadsheets.google.com/feeds/list/1prbiXHu9JS5eREkYgBQkxlkJELRHqrKz6-_PLGPWIWk/1/public/values?alt=json'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //update state when textbox input changes
  handleChange(event) {
    this.setState({src: event.target.value});
  }

  //update app state src on form submit
  handleSubmit(event) {
    this.props.setAppState("src" , this.state.src);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SourceForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            JSON URL:
            <input className="SourceForm-input" type="text" size="60" value={this.state.src} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Load Meetings" />
        </form>
      </div>
    );
  }
}

export default SourceForm;