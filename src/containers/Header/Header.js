import React from 'react';
import { connect } from 'react-redux';

import { setRedirect } from '../../actions';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {

  const redirect = () => {
    props.setRedirect('');
  }

  return (
    <div className="Header">
      <div className="title">
        <h1>Rotten Potatoes</h1>
      </div>
      <div className="nav">
        <p>Showing Results for:</p>
        <p>{ props.location && props.location.name }</p>
        <NavLink to="/">change location..</NavLink>
      </div>
    </div>
  )
}

export const mapStateToProps = (state) => ({
  location: state.location
})

export const mapDispatchToProps = (dispatch) => ({
  setRedirect: (redirect) => dispatch(setRedirect(redirect)), 
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);