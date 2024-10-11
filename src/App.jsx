import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MemoryCards from './components/MemoryCards.jsx';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [cardQuantity, setCardQuantity] = useState(4);

  //appends a new element in the 'pokemons' array on mount and url change
  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData = [];
        for (let i = 0; i < cardQuantity; i++) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${Math.ceil(
              Math.random() * 1000
            )}`
          );
          const data = await response.json();

          const fetchedName = data.forms[0].name;

          fetchedData.push({
            name: fetchedName[0].toUpperCase() + fetchedName.slice(1),
            imageUrl: data.sprites.other.home.front_default,
            wasClicked: false,
          });
        }

        setPokemons(fetchedData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [cardQuantity]);

  return (
    <>
      {pokemons.length === cardQuantity && <MemoryCards pokemons={pokemons} />}
    </>
  );
}

export default App;
