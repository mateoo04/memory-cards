import '../styles/Card.css';

export default function Card({ name, imageUrl, handleCardClick }) {
  return (
    <div className='card' onClick={handleCardClick}>
      <img src={imageUrl} alt='' />
      <h2>{name}</h2>
    </div>
  );
}
