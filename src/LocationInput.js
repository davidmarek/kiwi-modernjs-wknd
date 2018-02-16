import React, { Component } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

class LocationInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      focus: false,
      value: '',
      code: ''
    };

    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleRecommendationClicked = this.handleRecommendationClicked.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(event) {
    this.setState({ value: event.target.value });
    this.getLocationRecommendations(event.target.value).then(locations => {
      this.setState({ locations });
    });

    this.props.onLocationSelected(event.target.value);
  }

  handleOnFocus(event) {
    this.setState({ focus: true });
  }

  handleOnBlur(event) {
    this.setState({ focus: false });
  }

  handleRecommendationClicked(event) {
    console.log("click");
    this.setState({ 
      value: event.target.text,
      code: event.target.dataset.code,
      focus: false
    });

    this.props.onLocationSelected(event.target.dataset.code);
  }

  getLocationRecommendations(value) {
    return new Promise((resolve, reject) => {
      if (value === "") {
        return resolve([]);
      }
      
      axios.get("https://api.skypicker.com/locations/", {
        params: {
          term: value,
          locale: "en-US",
          v: 2
        }
      }).then(response => {
        if (response.status !== 200) {
          return reject("Failed to get locations");
        }

        resolve(response.data.locations);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  render() {
    return (
      <div>
        <div 
          className="dropdown">

          <input 
            type="text" 
            autoComplete="off"
            name={this.props.name}
            className="form-control" 
            placeholder={this.props.placeholder} 
            value={this.state.value} 
            onChange={this.handleValueChange}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur} />
          {this.state.locations.length > 0 && this.state.focus &&
            <div className="dropdown-menu show" style={{minWidth: "100%"}}>
              {this.state.locations.map((location, i) =>
                <a 
                  key={i} 
                  className="dropdown-item" 
                  data-code={location.code}
                  style={{cursor: "pointer"}}
                  onMouseDown={this.handleRecommendationClicked}>{location.name} ({location.code})</a>
              )}
            </div>}
          </div>
      </div>
    );
  }
}

LocationInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onLocationSelected: PropTypes.func.isRequired
};

export default LocationInput;