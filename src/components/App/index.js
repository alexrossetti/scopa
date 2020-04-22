import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import { score } from '../../utils/scoreUtils';
import Player from '../Player';
import { primieraScoring, cardValues } from '../../constants/cards';
import { getAllPossibleSums, sumOfCardValues } from '../../utils/cardUtils';
import Board from '../Board';
import { userCanPlayMove } from '../../utils/gameUtils';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [players, setPlayers] = useState(null);
  const [hands, setHands] = useState([]);
  const [score, setScore] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);
  const [cardToPlay, setCardToPlay] = useState(null);
  const [cardsToTake, setCardsToTake] = useState([]);

  useEffect(() => {
    if (players) {
      setHands(new Array(players));
      setScore(new Array(players).fill(0));
    }
    setDeck(setupShuffledDeck());
    dealToBoard();
    dealToPlayers();
  }, [players]);

  const dealToBoard = () => {
    const items = deck.splice(0, 4);
    setBoardCards(items);
  };

  const dealToPlayers = () => {
    const newHands = [];
    for (let i = 0; i < players; i++) {
      const items = deck.splice(0, 3);
      newHands.push(items);
    }
    setHands(newHands);
  };

  const playCard = () => {
    if (!cardsToTake.length) {
      // add selected card to board
    } else {
      // add selected card and the cards to take to the players 'won' deck
    }
  };

  const isDisabled =
    cardToPlay === null ||
    (sumOfCardValues([cardToPlay]) !== sumOfCardValues(cardsToTake) &&
      userCanPlayMove(hands[turn], boardCards));

  // console.log('deck', deck);
  // console.log('board sums', boardSums);

  return (
    <AppContainer>
      <GlobalStyles />
      {players === null && <button onClick={() => setPlayers(1)}>2</button>}
      {hands.map((hand, index) => {
        return (
          <Player
            key={index}
            score={score[index]}
            hand={hand}
            playCard={playCard}
            cardToPlay={cardToPlay}
            setCardToPlay={setCardToPlay}
          />
        );
      })}
      <Board
        cardToPlay={cardToPlay}
        boardCards={boardCards}
        cardsToTake={cardsToTake}
        setCardsToTake={setCardsToTake}
      />
      <button disabled={isDisabled} onClick={() => playCard()}>
        Play Card
      </button>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
