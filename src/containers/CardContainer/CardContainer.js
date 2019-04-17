import React, { Component } from 'react';
import { connect } from 'react-redux';
import haversine from 'haversine';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import Header from '../Header/Header';
import { isLoading } from '../../actions';
import { fetchAll } from '../../fetchAll';
import loader from '../../media/91.svg';

export class CardContainer extends Component {
  constructor() {
    super();
    this.state = { cards: [] };
  }

  fetchRestaurants = async () => {
    const url = 'https://data.colorado.gov/resource/d5e8-gubm.json';
    const data = await fetchAll(url);
    this.gatherRestaurantData(data);
  }

  gatherRestaurantData = (data) => {
    const restaurantData = this.props.restaurants.map(restaurant => {
      const correctPlaces = data.filter(dataPiece => dataPiece.facilityname === restaurant.name)
      const { location_address, city, state, zip, location } = correctPlaces[0];
      return { 
        name: restaurant.name, 
        id: restaurant.id,
        address: `${location_address}. ${city}, ${state}, ${zip}`,
        coordinates: location && location.coordinates,
        correctPlaces 
      };
    });
    this.findDistances(restaurantData);
  }

  findDistances(restaurants) {
    const { location } = this.props;
    let start = { 
      latitude: location.coords.lat, 
      longitude: location.coords.lng 
    };
    const addedDistances = restaurants.map(restaurant => {
      if (!restaurant.coordinates) return null;
      let end = { latitude: restaurant.coordinates[1], longitude: restaurant.coordinates[0]};
      let miles =  haversine(start, end, {unit: 'mile'});
      return {...restaurant, distance: miles };
    })
    this.sortByDistance(addedDistances);
  }
  
  sortByDistance = (restaurants) => {
    restaurants.sort(function(a, b) {
      if (!a || !b) return null;
      return a.distance - b.distance;
    });
    restaurants = restaurants.filter(restaurant => restaurant !== null);
    this.setState({cards: restaurants});
    this.props.isLoading(false);
  }

  render() {
    const { loading, location, restaurants } = this.props;
    const { cards } = this.state;
    if (location.coords && !cards.length) this.fetchRestaurants(restaurants);

    return loading

      ? (
        <div className="CardContainer">
          <Header />
          <img alt='loader gif' src={loader} className="loader"></img>
        </div>
      )

      : (
        <div className="CardContainer">
          <Header />
          <div className="card-grid">
            { cards.map((card) => <Card key={card.id} {...card} />) }
          </div>
        </div>
      )

  }
}

export const mapStateToProps = (state) => ({
  location: state.location,
  restaurants: state.restaurants,
  loading: state.loading
});

export const mapDispatchToProps = (dispatch) => ({
  isLoading: (boolean) => dispatch(isLoading(boolean))
})

CardContainer.propTypes = {
  location: PropTypes.object,
  restaurants: PropTypes.array,
  loading: PropTypes.bool,
  isLoading: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);