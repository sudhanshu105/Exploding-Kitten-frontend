import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  deck: [],
  drawnCard: null,
  gameStatus: 'not_started', // 'playing', 'win', 'lose'
  drawnCardCounter: 0,
  hasDefuse: false,
  username: '',
};

const possibleCards = [
  { type: 'cat' },
  { type: 'defuse' },
  { type: 'shuffle' },
  { type: 'exploding-kitten' }
];

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    startGame: (state) => {
      state.deck = createDeck();
      state.drawnCard = null;
      state.drawnCardCounter = 0;
      state.hasDefuse = false;
      state.gameStatus = 'playing';
    },
    resetGame: (state) => {
      state.deck = createDeck();
      state.drawnCard = null;
      state.drawnCardCounter = 0;
      state.hasDefuse = false;
      state.gameStatus = 'playing';
    },
    drawCard: (state) => {
      if (state.deck.length > 0) {
        const card = state.deck.pop();
        state.drawnCard = card;

        if (card.type === 'cat') {
          state.drawnCardCounter++;
        } else if (card.type === 'defuse') {
          state.hasDefuse = true;
          state.drawnCardCounter++;
        } else if (card.type === 'shuffle') {
          state.deck = shuffleDeck(createDeck());
          state.drawnCardCounter = 0;
          state.hasDefuse = false;
        } else if (card.type === 'exploding-kitten') {
          if (state.hasDefuse) {
            state.drawnCardCounter++;
            state.hasDefuse = false; // Use the defuse
          } else {
            state.drawnCardCounter = -1;
            state.gameStatus = 'lose';
          }
        }

        if (state.drawnCardCounter === 5) {
          state.gameStatus = 'win';
        }
      }

      console.log(state.drawnCardCounter);
    },
  },
});

export const { setUsername, startGame, resetGame, drawCard } = gameSlice.actions;
export default gameSlice.reducer;

// Function to create a new deck with random cards added from possibleCards pool
function createDeck() {
  const deck = [];
  for (let i = 0; i < 5; i++) {
    const randomCard = possibleCards[Math.floor(Math.random() * possibleCards.length)];
    deck.push(randomCard);
  }
  return shuffleDeck(deck);
}

// Function to shuffle the deck array
function shuffleDeck(deck) {
  return deck.sort(() => Math.random() - 0.5);
}
