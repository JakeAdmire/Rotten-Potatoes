import React, { Component } from 'react';
import { connect } from 'react-redux';
import haversine from 'haversine';

export class CardContainer extends Component {

  gatherRestaurants  = async (restaurants) => {
    const url = 'https://data.colorado.gov/resource/d5e8-gubm.json';
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.sortRestaurants(data, restaurants);
    } catch(error) {
      console.log(error);
    }
  }

  sortRestaurants(data, restaurants) {
    let restaurantsData = {}
    data.forEach(restaurant => {
      const { city, facilityname, inspectiondate, inspectionscore, inspectiontype, location, location_address, state, zip, violation, violationpoints, violationstatus, violationtype } = restaurant;
      const locationDetails = `${location_address}. ${state}, ${city}, ${zip}`;
      const coordinates = location && { 
        latitude: location.coordinates[1] , 
        longitude: location.coordinates[0]
      };
      const restaurantData = {
        address: locationDetails,
        coordinates,
        facilityname,
        inspectiondate,
        inspectionscore,
        inspectiontype,
        violation,
        violationpoints,
        violationstatus,
        violationtype
      };
      if (!restaurantsData[facilityname]) 
        restaurantsData = {...restaurantsData, [facilityname]: restaurantData};
    })
    this.convertObject(restaurantsData);
  }

  convertObject(restaurants) {
    let restaurantArray = [];
    Object.values(restaurants).forEach(value => restaurantArray.push(value));
    this.findDistances(restaurantArray);
  }

  findDistances(restaurants) {
    const { location } = this.props;
    let start = { 
      latitude: location.coords.lat, 
      longitude: location.coords.lng 
    };
    const addedDistances = restaurants.map(restaurant => {
      if (!restaurant.coordinates) return null;
      let end = { latitude: restaurant.coordinates.latitude, longitude: restaurant.coordinates.longitude};
      let miles =  haversine(start, end, {unit: 'mile'});
      return {...restaurant, distance: miles };
    })
    this.sortByDistance(addedDistances);
  }

  sortByDistance(restaurants) {
    restaurants.sort(function(a, b) {
      if (!a || !b) return null;
      return a.distance - b.distance;
    });
    console.log('sorted restaurants', restaurants);
    // lets display this fuckin' info!
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