import React, { Component } from "react";
import LocationInput from "./LocationInput"

class FlightSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      from: '',
      to: '',
      date: ''
    };

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFromSelected = this.handleFromSelected.bind(this);
    this.handleToSelected = this.handleToSelected.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFromSelected(code) {
    this.setState({ from: code });
    console.log(code);
  }

  handleToSelected(code) {
    this.setState({ to: code });
    console.log(code);
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSearch(this.state.from, this.state.to, this.state.date);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="row">

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="from">From:</label>
              <LocationInput name="from" placeholder="From where" onLocationSelected={this.handleFromSelected}/>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="to">To:</label>
              <LocationInput name="to" placeholder="To where" onLocationSelected={this.handleToSelected}/>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input 
                type="date" 
                name="date" 
                className="form-control" 
                id="date" 
                placeholder="Date" 
                value={this.state.date}
                onChange={this.handleDateChange} />
            </div>
          </div>

          <div className="col-sm-3 submit-button-flex">
            <button type="submit" className="btn btn-primary submit-button">Search</button>
          </div>
        </div>
      </form>
    );
  }
}

export default FlightSearch;