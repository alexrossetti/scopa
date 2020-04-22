import { getAllPossibleSums } from './cardUtils';
import { cardValues } from '../constants/cards';

export const userCanPlayMove = (hand, boardCards) => {
  return hand
    .map(card => {
      return getAllPossibleSums(boardCards).includes(
        cardValues[card.split(' ')[0]]
      );
    })
    .includes(true);
};
