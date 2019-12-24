import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Header = (props) => {

  return (
    <div className="Header">
      <div className="title">
        <h1>Rotten Potatoes</h1>
      </div>
      <div className="nav">
        <p>Showing Results for:</p>
        <p>{ props.location && props.location.name }</p>
        <NavLink to="/Rotten-Potatoes">change location..</NavLink>
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => ({
  location: state.location
})

Header.propTypes = {
  location: PropTypes.object
}

export default connect(mapStateToProps, null)(Header);