import { useEffect, useState } from 'react';
import './App.css';
import MemoryCards from './components/MemoryCards.jsx';
import Modal from './components/Modal.jsx';
import testImage from './assets/test-image.png';

function App() {
  const [data, setData] = useState([]);
  const [cardQuantity, setCardQuantity] = useState(4);
  const [gameCounter, setGameCounter] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  //game status may be: lost, won or ongoing
  const [gameStatus, setGameStatus] = useState('ongoing');

  useEffect(() => {
    console.log('data fetching effect running');

    const fetchData = async () => {
      const randoms = new Set();

      while (randoms.size < cardQuantity - data.length) {
        randoms.add(Math.ceil(Math.random() * 1000));
      }

      console.log(randoms);

      try {
        let newData = data.map((item) => {
          return { ...item, wasClicked: false };
        });

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

  const setUpNewGame = () => {
    setGameStatus('ongoing');
    setGameCounter(gameCounter + 1);
    setCurrentScore(0);
  };

  const continueToTheNextLevel = () => {
    if (cardQuantity < 30) setCardQuantity(cardQuantity + 2);

    setUpNewGame();
  };

  const handleCardClick = (clickedCard) => {
    console.log(clickedCard.name + ' clicked');

    if (clickedCard.wasClicked) {
      //handle losing
      setGameStatus('lost');

      console.log('game lost');
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
        setGameStatus('won');

        console.log('game won');
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
        {data.length !== cardQuantity && <div className='loader'></div>}
      </main>
      {gameStatus === 'won' && (
        <Modal
          title={'Congrats! You won this round.'}
          message={'Do you want to continue?'}
          buttonText='CONTINUE'
          onClose={continueToTheNextLevel}
        />
      )}
      {gameStatus === 'lost' && (
        <Modal
          title={'You lost.'}
          message={'Do you want to try again?'}
          buttonText={'TRY AGAIN'}
          onClose={setUpNewGame}
        />
      )}
    </>
  );
}

export default App;
