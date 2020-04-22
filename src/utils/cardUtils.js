import { cardValues } from '../constants/cards';

// return array/set of all possible sums of cards (and the way you create those sums?)
export const getAllPossibleSums = boardCards => {
  const points = boardCards.map(card => cardValues[card.split(' ')[0]]);

  const sums = [];
  let temp = 0;
  let tempCards = [];

  for (let i = 0; i < Math.pow(2, points.length); i++) {
    temp = 0;
    tempCards = [];

    for (let j = 0; j < points.length; j++) {
      if (i & Math.pow(2, j)) {
        temp += points[j];
        tempCards.push(boardCards[j]);
      }
    }
    if (temp !== 0 && temp <= 10) {
      sums.push(temp);
    }
  }

  return sums.sort((a, b) => a - b);
};

export const sumOfCardValues = array => {
  return array.reduce((total, card) => {
    return (total += cardValues[card.split(' ')[0]]);
  }, 0);
};
