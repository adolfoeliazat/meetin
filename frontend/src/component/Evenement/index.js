import React, { Component } from 'react';
import NavBar from './../Navbar';
import TitleBar from './../TitleBar';
import Box from './../Box';

class Evenement extends Component {
  render() {
    return (
      <div>
        <NavBar menuActive="events" />
        <TitleBar title="Chosissez votre évenement" />
        <div className="columns is-multiline is-mobile">
          <Box image="https://image.flaticon.com/icons/svg/167/167741.svg" />
          <Box image="https://image.flaticon.com/icons/svg/167/167741.svg" />
          <Box image="https://image.flaticon.com/icons/svg/167/167741.svg" />
          <Box image="https://image.flaticon.com/icons/svg/167/167741.svg" />
          <Box image="https://image.flaticon.com/icons/svg/167/167741.svg" />
        </div>
      </div>
    );
  }
}

export default Evenement;
