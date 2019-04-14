import React, { Component } from 'react';
import Geocode from "react-geocode";
import { connect } from 'react-redux';
import { setRestaurants, setLocation, setRedirect } from '../../actions';
import { geocodeKey } from '../../keys';

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
    this.props.setRedirect('locations');
  }

  handleClick = (event) => {
    if ("geolocation" in navigator) {
      console.log('finding position...'); // start loader here
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
      console.log('...position found'); // end loader here
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { value } = this.state;
    const placeholder='ex. 123 Fake Address, Denver, CO'
    return (
      <div className="Form">
        <label htmlFor="address">Enter an address</label>
        <input  value={value} 
                onChange={this.handleChange} 
                id="address" 
                type="text" 
                placeholder={placeholder}>
        </input>
        <h3>FOR</h3>
        <button onClick={this.handleClick}>Find My Location</button>
      </div>
    )
  }
}

export const setDispatchToProps = (dispatch) => ({
  setRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
  setLocation: (location) => dispatch(setLocation(location)),
  setRedirect: (redirect) => dispatch(setRedirect(redirect))
})

export default connect(null, setDispatchToProps)(Form);