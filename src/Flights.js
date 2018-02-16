import React, { Component } from "react";
import Pagination from './Pagination';

class Flights extends Component {
  constructor(props) {
    super(props);

    this.PAGE_SIZE = 5;

    this.state = { 
      pageIndex: 1,
      pageCount: Math.ceil(props.flights.length / this.PAGE_SIZE)
    };

    this.setPage = this.setPage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!this.areFlightsEqual(this.props.flights, newProps.flights)) {
      this.setState({
        pageIndex: 1,
        pageCount: Math.ceil(newProps.flights.length / this.PAGE_SIZE)
      });
    }
  }

  areFlightsEqual(flights, newFlights) {
    if (flights.length !== newFlights.length) {
      return false;
    } else {
      for (let i = 0; i < flights.length; i++) {
        const first = flights[i];
        const second = newFlights[i];

        if (first.price !== second.price) return false;
        if (first.from !== second.from) return false;
        if (first.to !== second.to) return false;
        if (first.departure !== second.departure) return false;
        if (first.arrival !== second.arrival) return false;
      }
    }
  }

  setPage(index) {
    this.setState({
      pageIndex: index
    });
  }

  render() {
    const displayedFlights = this.props.flights.slice((this.state.pageIndex - 1) * this.PAGE_SIZE, this.state.pageIndex * this.PAGE_SIZE);
    const renderedFlights = displayedFlights.map((flight, i) => this.renderFlight(i, flight));

    return (
      <div>
        <Pagination pageIndex={this.state.pageIndex} pageCount={this.state.pageCount} onPageChange={this.setPage}/>

        {renderedFlights}
      </div>
    );
  }

  renderFlight(key, flight) {
    return (
      <div key={key} className="card">
        <div className="row card-body">
          <div className="col-sm-2">
            {flight.price} EUR
          </div>

          <div className="col">
            <div className="row">
              <strong>From:&nbsp;</strong> {flight.from}
            </div>
            <div className="row">
              <strong>To:&nbsp;</strong> {flight.to}
            </div>
          </div>
          
          <div className="col">
            <strong>Departure:</strong> {flight.departure}
          </div>

          <div className="col">
            <strong>Arrival:</strong> {flight.arrival}
          </div>
        </div>
      </div>
    )
  }
}

export default Flights;