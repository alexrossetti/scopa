import { cardValues } from '../constants/cards';

export const getAllPossibleSums = boardCards => {
  const points = boardCards.map(card => cardValues[card.split(' ')[0]]);
  // return array/set of all possible sums of cards (and the way you create those sums?)

  let combinations = Math.pow(2, points.length);
  let comb = [];
  let temp = 0;

  for (let i = 0; i < combinations; i++) {
    temp = 0;

    for (let j = 0; j < points.length; j++) {
      if (i & Math.pow(2, j)) {
        temp += points[j];
      }
    }
    if (temp !== 0 && temp <= 10) {
      comb.push(temp);
    }
  }

  return [...new Set(comb.sort((a, b) => a - b))];
};
