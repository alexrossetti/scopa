import { getAllPossibleSums } from './cardUtils';
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

export const isDealDisabled = hands => {
  if (!hands.length) return true;

  let isDisabled = false;

  hands.flat().forEach(card => {
    console.log('card', card);
    if (card !== null) {
      isDisabled = true;
    }
  });

  return isDisabled;
};
