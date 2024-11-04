// src/App.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import Deck from './components/Deck';
import GameControls from './components/GameControls';
import { startGame, resetGame } from './store/gameSlice';
import './App.css';
import Leaderboard from './components/Leaderboard';

function App() {
  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  return (
    <div className="app">
      <div className="temp">
      <GameControls startGame={handleStartGame} resetGame={handleResetGame} />
      <Deck />
      </div>
      <div className="leaderboardDiv">
      <Leaderboard /></div>
    </div>
  );
}

export default App;
