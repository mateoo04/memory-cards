import '../styles/Card.css';

export default function Card({ name, imageUrl }) {
  console.log(name);
  return (
    <div className='card'>
      <img src={imageUrl} alt='' />
      <h2>{name}</h2>
    </div>
  );
}
