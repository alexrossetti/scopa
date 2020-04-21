import { primieraScoring } from '../constants/cards';

export const scorePrimiera = decks => {
  const primiera = decks.map(deck => {
    return deck.reduce((total, element) => {
      const cardValue = element.split(' ')[0];
      const scoreValue = parseInt(primieraScoring[cardValue]);
      return total + scoreValue;
    }, 0);
  });

  return primiera;
};

export const scoreSetteBello = decks => {
  const scores = decks.map(deck => {
    return deck.includes('7 Denari') ? 1 : 0;
  });

  return scores;
};

export const scoreDenari = decks => {
  return decks.map(deck => {
    return deck.reduce((total, element) => {
      const suit = element.split(' ')[1] === 'Denari';
      return suit ? total + 1 : total;
    }, 0);
  });
};

export const scoreCards = decks => {
  return decks.map(deck => {
    return deck.length;
  });
};

// takes in an array of counts, and returns the score attached to that array;
const normalizeScores = arr => {
  const scores = Array(arr.length).fill(0);
  let indexOfHighScore = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[indexOfHighScore]) {
      // no absolute winner, so no points for anyone
      return scores;
    }
    if (arr[i] > arr[indexOfHighScore]) {
      indexOfHighScore = i;
    }
  }
  scores[indexOfHighScore] = 1;
  return scores;
};

const normalizeAllScores = scores => {
  const allScores = [];

  for (let i = 0; i < scores.length; i++) {
    const normal = normalizeScores(scores[i]);
    allScores.push(normal);
  }

  return allScores;
};

const getTotalPoints = arr => {
  const scores = new Array(arr[0].length).fill(0);

  arr.forEach(round => {
    round.forEach((score, index) => {
      scores[index] += score;
    });
  });

  return scores;
};

export const score = decks => {
  const scores = [
    scorePrimiera(decks),
    scoreSetteBello(decks),
    scoreDenari(decks),
    scoreCards(decks),
  ];

  const points = normalizeAllScores(scores);
  const totalPoints = getTotalPoints(points);
  return totalPoints;
};
