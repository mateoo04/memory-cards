import Card from './Card.jsx';

export default function MemoryCards({ pokemons }) {
  console.log(pokemons);
  return (
    <>
      {pokemons.map((pokemon) => {
        return <Card name={pokemon.name} imageUrl={pokemon.imageUrl} />;
      })}
    </>
  );
}
