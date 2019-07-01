import React from 'react';

class SourceForm extends React.Component {
  constructor(props) {
    super(props);
    // intialized to Cataret County Google Sheet for testing purposes
    this.state = {value: 'https://spreadsheets.google.com/feeds/list/1prbiXHu9JS5eREkYgBQkxlkJELRHqrKz6-_PLGPWIWk/1/public/values?alt=json'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.props.updateSource(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="SourceForm">
        <form onSubmit={this.handleSubmit}>
          <label>
            JSON URL:
            <input className="SourceForm-input" type="text" size="60" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Create PDF" />
        </form>
      </div>
    );
  }
}

export default SourceForm;