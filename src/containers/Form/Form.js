import React, { Component } from 'react';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { setRestaurants, setLocation, isLoading } from '../../actions';
import { geocodeKey } from '../../keys';
import { NavLink } from 'react-router-dom';

export class Form extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEnter); 
  }

  handleEnter = (event) => {
    if (event.key !== 'Enter') return null;
    this.state.value && this.getLocation()
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({value});
  }

  getLocation = async () => {
    this.props.isLoading(true);
    Geocode.setApiKey(geocodeKey);
    const { value } = this.state;
    try {
      const response = await Geocode.fromAddress(value);
      this.gatherLocationInfo(response.results[0])
    } catch (error) {
      console.log(error.message);
    }
  }

  gatherLocationInfo = (result) => {
    let location = {
      name: result.formatted_address,
      coords: result.geometry.location
    };
    this.props.setLocation(location);
  }

  handleClick = (event) => {
    if ("geolocation" in navigator) {
      this.props.isLoading(true);
      navigator.geolocation.getCurrentPosition(
        function(position) { 
          const { latitude, longitude } = position.coords;
          callFunction({latitude, longitude});
        }
      );
      const callFunction = (position) => { this.getAddress(position); }
    } else {
      console.log('geolocation is not enabled on this browser');
    }
  }

  getAddress = async (position) => {
    Geocode.setApiKey(geocodeKey);
    try {
      const response = await Geocode.fromLatLng(position.latitude, position.longitude);
      this.gatherLocationInfo(response.results[0])
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div className="Form">
        <h1>Rotten Potatoes</h1>
        <label htmlFor="address">Enter an address:</label>
        <input  value={value} 
                onChange={this.handleChange} 
                id="address" 
                type="text" 
                placeholder='ex. 123 Fake Address, Denver, CO'>
        </input>
        <h3>OR</h3>
        <NavLink to="/locations" onClick={this.handleClick}>Find My Location</NavLink>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  loading: state.loading
});

export const mapDispatchToProps = (dispatch) => ({
  setRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
  setLocation: (location) => dispatch(setLocation(location)),
  isLoading: (boolean) => dispatch(isLoading(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);