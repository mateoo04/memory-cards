import Card from './Card.jsx';
import '../styles/MemoryCards.css';

export default function MemoryCards({ data, handleCardClick }) {
  const shuffledData = [...data];

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
  }

  return (
    <div className={`card-container card-container-${shuffledData.length}`}>
      {shuffledData.map((item) => {
        return (
          <Card
            key={item.name}
            name={item.name}
            imageUrl={item.imageUrl}
            handleCardClick={() => handleCardClick(item)}
          />
        );
      })}
    </div>
  );
}
