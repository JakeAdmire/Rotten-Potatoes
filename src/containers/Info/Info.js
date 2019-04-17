import React, { Component } from 'react';

export class Info extends Component {

  buildDate(date) {
    return date.split('T')[0];
  }

  buildDistance = (distance) => {
    let splitDistance = distance.toString().split('.');
    let decimal = splitDistance[1].slice(0, 1);

    return splitDistance[0] + '.' + decimal + 'm away';
  }

  render() {
    const { name, address, correctPlaces, distance } = this.props;
    const { inspectiontype, violation, violationtype, inspectionscore, inspectiondate } = correctPlaces[0];

    let date = this.buildDate(inspectiondate);
    let distanceText = this.buildDistance(distance);
    return(
      <div className="Info">
        <h1>{name}</h1>
        <p>{distanceText}</p>
        <p>{address}</p>
        <h3>Latest Inspection:</h3>
        <p>Date: {date}</p>
        <p>Inspection Type: {inspectiontype}</p>
        <p>Inspection Violation: {violation}</p>
        <p>Violation Status: {violationtype}</p>
        <p>Inspection Score: {inspectionscore}</p>
      </div>
    )
  }
}