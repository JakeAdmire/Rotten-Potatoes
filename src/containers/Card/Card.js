import React, { Component } from 'react';

export class Card extends Component {

  buildTitle = () => {
    if (!this.props.facilityname) return null;

    const { facilityname } = this.props;
    let nameArray = facilityname.toLowerCase().split(' ');

    return nameArray.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  }

  buildAddress = () => {
    if (!this.props.address) return null;
    const { address } = this.props;
    let addressArray = address.toLowerCase().split(' ');

    addressArray = addressArray.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).reverse();

    const bigCity = addressArray[1].toUpperCase();
    addressArray.splice(1, 1, bigCity);

    return addressArray.reverse().join(' ');
  }

  buildDistance = () => {
    if (!this.props.distance) return null;
    const { distance } = this.props;
    let splitDistance = distance.toString().split('.');
    let decimal = splitDistance[1].slice(0, 1);

    return splitDistance[0] + '.' + decimal + 'm away';
  }

  render() {
    let headerText = this.buildTitle();
    let addressText = this.buildAddress();
    let distanceText = this.buildDistance();
    return (
      <div className="Card">
        <div className="card-text">
          <h3>{headerText}</h3>
          <p>{addressText}</p>
          <p>{distanceText}</p>
        </div>
        <div className="card-percentage">
          <p>inspection score:</p>
          <p>{ this.props.inspectionscore + '%' }</p>
          <p>{ this.props.violationtype }</p>
        </div>
        <div className="card-favorite">
          +
        </div>
      </div>
    )
  }
}

export default Card;