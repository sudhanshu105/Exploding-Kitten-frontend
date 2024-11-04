import React from 'react';
import styles from '../styles/Card.module.css';

function Card({ card, onClick, isFlipped }) {
  return (
    <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`} onClick={onClick}>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}></div> 
        <div className={styles.cardBack}>
          {card.type === 'cat' && '😼'}
          {card.type === 'defuse' && '🙅‍♂️'}
          {card.type === 'shuffle' && '🔀'}
          {card.type === 'exploding-kitten' && '💣'}
        </div>
      </div>
    </div>
  );
}

export default Card;
