import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { setRestaurants } from '../../actions';
import Form from '../Form/Form';
import CardContainer from '../CardContainer/CardContainer';

class App extends Component {

  componentDidMount() {
    this.fetchRestaurants();
  }

  async fetchRestaurants() {
    const url = 'https://data.colorado.gov/resource/d5e8-gubm.json';
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.gatherRestaurantNames(data);
    } catch(error) {
      console.log(error);
    }
  }

  gatherRestaurantNames = (data) => {
    const facilities = data.map(facility =>  facility.facilityname)
    const flatFacilities = [...new Set(facilities)];
    this.props.setRestaurants(flatFacilities);
  }

  render() {
    let redirect = this.props.redirect;
    return (
      <div className="App">
        <div className="background-image"></div>
        <div className="app-frame"></div>
        <div className="App-content">
          <Route exact path="/" component={Form} />

          <Route exact path="/locations" component={CardContainer} />

          <Route exact path="/" render={() => (
            redirect && <Redirect to={'/' + redirect} />
          )} />
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  redirect: state.redirect
})

export const setDispatchToProps = (dispatch) => ({
  setRestaurants: (restaurants) => dispatch(setRestaurants(restaurants)),
})

export default connect(mapStateToProps, setDispatchToProps)(App);