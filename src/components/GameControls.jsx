import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/App.module.css';
import { setUsername } from '../store/gameSlice';

function GameControls({ startGame, resetGame }) {
  const dispatch = useDispatch();
  const gameStatus = useSelector((state) => state.game.gameStatus);
  // const [username, setUsername] = useState('');
  const username = useSelector((state) => state.game.username);
  const [inputUsername, setInputUsername] = useState('');
  const [usernameSet,setUsernameSet] = useState(false);

  const handleStartGame = () => {
    if (!inputUsername) {
      alert("Please enter a username to start the game.");
    } else {
      startGame();
      dispatch(setUsername(inputUsername));
      setUsernameSet(true);
    }
  };

  return (
    <div className={styles.controls}>
      {!usernameSet ? (
        <div>
          <input
            type="text"
            placeholder="Enter your username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className={styles.usernameInput}
          />
          <button onClick={handleStartGame} className={styles.startButton}>
            Start Game
          </button>
        </div>
      ) : (
        <>
        {/* <div className={styles.namewrapper}>
        <h2>Welcome {username} !!</h2></div> */}
          <button onClick={resetGame} className={styles.resetButton}>
            Reset Game
          </button>
          {gameStatus === 'win' && <p>Congratulations, {username}! 🎉 You won the game!</p>}
          {gameStatus === 'lose' && <p>Sorry, {username}. You lost! 💥</p>}
        </>
      )}
    </div>
  );
}

export default GameControls;
