import React, { Component } from 'react';

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
    // this.props.setRestaurants(flatFacilities);
  }

  render() {
    return (
      <div className="App">
        <h1>Rotten Potatoes</h1>
      </div>
    );
  }
}

export default App;
