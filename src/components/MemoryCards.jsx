import Card from './Card.jsx';
import '../styles/MemoryCards.css';
import { useEffect, useState } from 'react';

export default function MemoryCards({
  data,
  handleCardClick,
  disappearingAnimation,
  goLeftwardsAnimation,
}) {
  const shuffledData = [...data];

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }

  return (
    <div
      className={`card-container card-container-${shuffledData.length}`}
      style={{ overflowX: 'hidden' }}
    >
      {shuffledData.map((item) => {
        return (
          <Card
            goLeftwardsAnimation={goLeftwardsAnimation}
            disappearingAnimation={disappearingAnimation}
            key={Date.now() + item.name}
            name={item.name}
            imageUrl={item.imageUrl}
            handleCardClick={() => handleCardClick(item)}
          />
        );
      })}
    </div>
  );
}
