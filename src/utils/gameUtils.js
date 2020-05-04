import { getAllPossibleSums, sumOfCardValues } from './cardUtils';
import { cardValues } from '../constants/cards';

export const userCanPlayMove = (hand, boardCards) => {
  return hand
    .map(card => {
      if (card === null) return false;
      return getAllPossibleSums(boardCards).includes(
        cardValues[card.split(' ')[0]]
      );
    })
    .includes(true);
};

export const isDealDisabled = players => {
  if (!players.length) return true;

  let isDisabled = false;

  players.forEach(player => {
    const { hand } = player;
    hand.some(card => {
      if (card !== null) {
        isDisabled = true;
      }
      return card !== null;
    });
  });

  return isDisabled;
};

export const isPlayDisabled = (
  cardToPlay,
  cardsToTake,
  players,
  turn,
  boardCards
) => {
  return (
    cardToPlay === null ||
    (sumOfCardValues([cardToPlay]) !== sumOfCardValues(cardsToTake) &&
      userCanPlayMove(players[turn].hand, boardCards)) ||
    (!userCanPlayMove(players[turn].hand, boardCards) &&
      cardsToTake.length !== 0)
  );
};

export const isFinished = (deck, hands) => {
  if (deck.length === 0) {
    return true;
  }

  // if every hand is empty return true;
  hands.flat().some(c => c !== null);

  return false;
};

export const isLastTurn = (deck, players) => {
  if (deck.length !== 0) {
    return false;
  }

  let isLastTurn = true;

  players.forEach(player => {
    const { hand } = player;

    hand.forEach(card => {
      if (card !== null) isLastTurn = false;
    });
  });

  return isLastTurn;
};
