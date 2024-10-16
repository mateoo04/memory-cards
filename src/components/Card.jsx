import '../styles/Card.css';
import BackIcon from '../assets/pokeball.svg';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Card({
  name,
  imageUrl,
  handleCardClick,
  disappearingAnimation,
  goLeftwardsAnimation,
}) {
  return (
    <div
      className={`card ${
        disappearingAnimation ? 'disappearing-animation' : ''
      } ${goLeftwardsAnimation ? 'disappear-leftwards' : ''}`}
      onClick={handleCardClick}
    >
      <div className='front'>
        <img src={imageUrl} alt='' />
        <h2>{name}</h2>
      </div>
      <div className='back'>
        <img src={BackIcon} alt='' />
      </div>
    </div>
  );
}
