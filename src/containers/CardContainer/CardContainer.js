import React, { Component } from 'react';
import { connect } from 'react-redux';
// import haversine from 'haversine';

export class CardContainer extends Component {

  gatherRestaurants  = async (restaurants) => {
    const url = 'https://data.colorado.gov/resource/d5e8-gubm.json';
    try {
      const response = await fetch(url);
      const data = await response.json();
      // this.sortRestaurants(data, restaurants);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { location, restaurants } = this.props;
    location && this.gatherRestaurants(restaurants);
    return (
      <div>
        CARDCONTAINER
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  location: state.location,
  restaurants: state.restaurants
});

export default connect(mapStateToProps, null)(CardContainer);