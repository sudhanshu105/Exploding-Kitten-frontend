import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawCard } from '../store/gameSlice';
import { updateScore } from './api'; 
import Card from "./Card";
import styles from '../styles/Deck.module.css';

function Deck() {
  const dispatch = useDispatch();
  const { deck, drawnCard, gameStatus, drawnCardCounter, username } = useSelector((state) => state.game);
  // const [username, setUsername] = useState("player1"); // Assume you have a way to set this

  const handleDrawCard = () => {
    if (gameStatus === 'playing') {
      dispatch(drawCard());

      // useEffect(() => {
      //   if (drawnCardCounter === 4 && drawnCard.type !== "shuffle") {
      //     handleGameWin(username);
      //   }
      // }, [drawnCardCounter, drawnCard]);
    }
  };

  const handleGameWin = (username) => {
    updateScore(username, 1); 
  };

  // Calculate the number of cards left in the deck
  const cardsLeft = 5 - drawnCardCounter;
  useEffect(()=>{
    if(cardsLeft==0){
      handleGameWin(username);
    }
  })
  

  return (
    <div className={styles.deckContainer}>

      <div className={styles.cardOnly}>
      <div className={styles.deck}>
        {/* Display the top card of the deck as the "back" of the deck */}
        {cardsLeft > 0 ? (
          <Card card={{ type: 'back' }} isFlipped={false} />
        ) : (
          <p>No cards left</p>
        )}
      </div>
      
      <div className={styles.drawnCardArea}>
        {/* Show the latest drawn card in the designated area */}
        {drawnCard && <Card card={drawnCard} isFlipped={true} />}
      </div>

      </div>

      {/* Button to draw a new card */}
      <button onClick={handleDrawCard} disabled={gameStatus !== 'playing' || cardsLeft === 0 || cardsLeft > 5}>
        Draw Card
      </button>

      {/* Display "Cards Left" count */}
      <p>Cards Left: {cardsLeft >= 0 ? cardsLeft : 0}</p>
    </div>
  );
}

export default Deck;
