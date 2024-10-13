import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MemoryCards from './components/MemoryCards.jsx';
import testImage from './assets/test-image.png';

function App() {
  const [data, setData] = useState([]);
  const [cardQuantity, setCardQuantity] = useState(10);
  const [gameCounter, setGameCounter] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    console.log('data fetching effect running');

    if (process.env.NODE_ENV === 'development') {
      setData([
        {
          name: 'Flapple',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Ninjask',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Venipede',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Dracozolt',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Machoke',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Obi',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Dodrio',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Tinkatink',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Clamperl',
          imageUrl: testImage,
          wasClicked: false,
        },
        {
          name: 'Fearow',
          imageUrl: testImage,
          wasClicked: false,
        },
      ]);
      return;
    }

    const fetchData = async () => {
      const randoms = new Set();

      while (randoms.size < cardQuantity - data.length) {
        randoms.add(Math.ceil(Math.random() * 1000));
      }

      console.log(randoms);

      try {
        let newData = [...data];
        for (const item of randoms) {
          console.log(item);

          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${item}`
          );
          const data = await response.json();

          const fetchedName = data.forms[0].name;

          newData.push({
            id: `${gameCounter}-${
              fetchedName[0].toUpperCase() + fetchedName.slice(1)
            }`,
            name: fetchedName[0].toUpperCase() + fetchedName.slice(1),
            imageUrl: data.sprites.other.home.front_default,
            wasClicked: false,
          });
        }

        setData(newData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [gameCounter]);

  const handleCardClick = (clickedCard) => {
    console.log(clickedCard.name + ' clicked');

    if (clickedCard.wasClicked) {
      //end of the game
      setGameCounter(gameCounter + 1);
      setCurrentScore(0);
    } else {
      setCurrentScore(currentScore + 1);
      if (bestScore === currentScore) setBestScore(currentScore + 1);

      //modifying array
      const newArray = data.map((item) => {
        if (clickedCard.name === item.name) {
          return { ...item, wasClicked: true };
        }
        return item;
      });

      setData(newArray);

      if (newArray.every((item) => item.wasClicked)) {
        if (cardQuantity < 10) {
          setCardQuantity(cardQuantity + 2);
        }
      }

      console.log(`current score: ${currentScore}, best score: ${bestScore}`);
    }
  };

  return (
    <>
      <header>
        <h1>Memory Cards</h1>
        <div className='scores'>
          <p>
            Current score: <span className='current-score'>{currentScore}</span>
          </p>
          <p>
            Best score: <span className='best-score'>{bestScore}</span>
          </p>
        </div>
      </header>
      <main>
        {data.length === cardQuantity && (
          <MemoryCards handleCardClick={handleCardClick} data={data} />
        )}
      </main>
    </>
  );
}

export default App;
