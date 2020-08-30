import React, { Component } from 'react';
import Lottie from 'react-lottie';
import animationData from '../../styles/animations/option2.json';
import Button from '../atoms/Button';

class Congratulations extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className="Uncontrolled">
        <h3>Congratulations you can find a babysitter in Hisitter</h3>

        <Lottie options={ defaultOptions } height={ 600 } width={ 900 } />

        <Button text= { 'Continuar' } />


      </div>
    );
  }
}

export default Congratulations;