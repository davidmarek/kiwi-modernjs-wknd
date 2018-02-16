import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import FlightSearch from './FlightSearch';
import Flights from './Flights';

class App extends Component {
  constructor() {
    super();

    this.state = {
      flights: []
    };

    this.handleOnSearch = this.handleOnSearch.bind(this);
  }

  handleOnSearch(from, to, date) {
    this.getFlights(from, to, date).then(flights => {
      var parsedFlights = flights.map(this.extractFlight);
      this.setState({ flights: parsedFlights });
    });
  }

  extractFlight(data) {
    const departureTime = new Date(data.dTime * 1000);
    const arrivalTime = new Date(data.aTime * 1000);
    return {
      price: data.conversion.EUR,
      from: data.cityFrom,
      to: data.cityTo,
      departure: departureTime.toLocaleDateString() + " " + departureTime.toLocaleTimeString(),
      arrival: arrivalTime.toLocaleDateString() + " " + arrivalTime.toLocaleTimeString()
    };
  }

  getFlights(from, to, date) {
    return new Promise((resolve, reject) => {
      const parsedDate = new Date(date);
      const formattedDate = `${parsedDate.getDate()}/${parsedDate.getMonth() + 1}/${parsedDate.getFullYear()}`;
      axios.get("https://api.skypicker.com/flights", {
        params: {
          flyFrom: from,
          to: to,
          dateFrom: formattedDate,
          dateTo: formattedDate
        }
      }).then(response => {
        if (response.status !== 200) {
          return reject("Failed to get flights");
        }

        resolve(response.data.data);
      }).catch(error => reject(error));
    });
  }

  render() {
    return (
      <div className="App container">
        <div className="row justify-content-md-center">
          <div className="card col-sm-12">
            <div className="card-body">
              <h1 className="card-title">Flight search</h1>
              <hr/>
              <FlightSearch onSearch={this.handleOnSearch}/>
            </div>
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="card col-sm-12">
            <div className="card-body">
              <h1 className="card-title">Results</h1>
              <hr/>
              {this.state.flights.length > 0 ?
              <Flights flights={this.state.flights}/>
              : <p>No flights found</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
