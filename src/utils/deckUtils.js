const suits = ['Spade', 'Denari', 'Coppe', 'Bastoni'];
const cards = [1, 2, 3, 4, 5, 6, 7, 'Fante', 'Cavallo', 'Re'];

export const setupDeck = () => {
  let deck = [];

  suits.forEach(suit => {
    cards.forEach(card => {
      deck.push(`${card} ${suit}`);
    });
  });

  return deck;
};

export const shuffleDeck = deck => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const setupShuffledDeck = () => {
  const deck = setupDeck();
  return shuffleDeck(deck);
};
