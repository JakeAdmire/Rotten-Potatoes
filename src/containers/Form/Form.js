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