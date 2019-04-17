import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Card extends Component {

  buildTitle = (name) => {
    let nameArray = name.toLowerCase().split(' ');

    return nameArray.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  buildAddress = (address) => {
    let addressArray = address.toLowerCase().split(' ');

    addressArray = addressArray.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).reverse();

    const bigCity = addressArray[1].toUpperCase();
    addressArray.splice(1, 1, bigCity);

    return addressArray.reverse().join(' ');
  }

  buildDistance = (distance) => {
    let splitDistance = distance.toString().split('.');
    let decimal = splitDistance[1].slice(0, 1);

    return splitDistance[0] + '.' + decimal + 'm away';
  }

  render() {
    const { name, address, distance, id } = this.props;
    const { inspectionscore, violationtype } = this.props.correctPlaces[0];

    let headerText = this.buildTitle(name);
    let addressText = this.buildAddress(address);
    let distanceText = this.buildDistance(distance);

    return (
      <div className="Card">
        <div className="card-text">
          <Link to={`/locations/${id}`}>{headerText}</Link>
          <p>{addressText}</p>
          <p>{distanceText}</p>
        </div>
        <div className="card-percentage">
          <p>inspection score:</p>
          <p>{ inspectionscore + '%' }</p>
          <p>{ violationtype }</p>
        </div>
        <div className="card-favorite">
          +
        </div>
      </div>
    )
  }
}

export default Card;