import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUserButton from './DemoUserButton';


import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/">Lakr Home</NavLink>
        <NavLink exact to="/photos">View All Photos</NavLink>
        <DemoUserButton />
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
