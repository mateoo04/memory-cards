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
  const [showHowToPlayDialog, setShowHowToPlayDialog] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const randoms = new Set();

      while (randoms.size < cardQuantity - data.length) {
        randoms.add(Math.ceil(Math.random() * 1000));
      }

      try {
        let newData = data.map((item) => {
          return { ...item, wasClicked: false };
        });

        for (const item of randoms) {
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
    if (clickedCard.wasClicked) {
      //handle losing
      setGameStatus('lost');
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
      }
    }
  };

  return (
    <>
      <header>
        <div className='header-content'>
          <h1>Memory Cards</h1>
          <div className='scores'>
            <p>
              Current score:{' '}
              <span className='current-score'>{currentScore}</span>
            </p>
            <p
              style={{
                color:
                  bestScore === currentScore && bestScore > 0
                    ? '#FF0000'
                    : '#000',
              }}
            >
              Best score: <span className='best-score'>{bestScore}</span>
            </p>
          </div>
        </div>
      </header>
      <main>
        {data.length === cardQuantity && (
          <MemoryCards
            handleCardClick={handleCardClick}
            data={data}
            disappearingAnimation={gameStatus === 'lost' ? true : false}
            goLeftwardsAnimation={gameStatus === 'won' ? true : false}
            animateOnRender={
              showHowToPlayDialog || gameStatus !== 'ongoing' ? false : true
            }
          />
        )}
        {data.length !== cardQuantity && <div className='loader'></div>}
      </main>
      {showHowToPlayDialog && (
        <Modal
          title={'How to play?'}
          message={
            'Each card can only be clicked once to continue the game. By clicking the same card for a second time, you lose, but you may start over. Card quantity is increased on each level. Good luck playing!'
          }
          buttonText='PLAY'
          onClose={() => setShowHowToPlayDialog(false)}
        />
      )}
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
      <button
        onClick={() => setShowHowToPlayDialog(true)}
        className='how-to-play-button'
      >
        ?
      </button>
    </>
  );
}

export default App;
