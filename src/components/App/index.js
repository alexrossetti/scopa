import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import Player from '../Player';
import { sumOfCardValues } from '../../utils/cardUtils';
import Board from '../Board';
import { userCanPlayMove, isDealDisabled } from '../../utils/gameUtils';

export default function App() {
  const [players, setPlayers] = useState(null);
  const [hands, setHands] = useState([]);
  const [wonCards, setWonCards] = useState([]);
  const [score, setScore] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);
  const [cardToPlay, setCardToPlay] = useState(null);
  const [cardsToTake, setCardsToTake] = useState([]);

  useEffect(() => {
    setPlayers(1);
    if (players) {
      setHands(new Array(players));
      setScore(new Array(players).fill(0));
      setWonCards(new Array(players).fill([]));
    }
    setDeck(setupShuffledDeck());
    dealToBoard();
  }, [players]);

  const dealToBoard = () => {
    const items = deck.slice(0, 4);
    setBoardCards(items);
    setDeck(deck => deck.filter(c => !items.includes(c)));
  };

  const dealToPlayers = () => {
    const newHands = [];
    for (let i = 0; i < players; i++) {
      const items = deck.slice(0, 3);
      newHands.push(items);
      setDeck(deck => deck.filter(c => !items.includes(c)));
    }

    setHands(newHands);
  };

  const removeCardFromHand = (hand, card) => {
    const newHand = hand;
    const cardIndex = newHand.findIndex(c => c === card);
    newHand[cardIndex] = null;
  };

  const removeCardsFromBoard = cards => {
    const newBoardCards = boardCards.filter(c => !cards.includes(c));
    setBoardCards(newBoardCards);
  };

  const playCard = () => {
    if (!cardsToTake.length) {
      removeCardFromHand(hands[turn], cardToPlay);
      setBoardCards([...boardCards, cardToPlay]);
    } else {
      // add selected card and the cards to take to the players 'won' deck
      const toTake = [cardToPlay, ...cardsToTake];
      const newWonCards = wonCards;
      newWonCards[turn] = [...newWonCards[turn], ...toTake];

      removeCardFromHand(hands[turn], cardToPlay);
      removeCardsFromBoard(cardsToTake);
      setWonCards(newWonCards);
      // remove card to play from the users hand
    }

    if (boardCards.length === 0 && deck.length > 0) {
      const newScores = score;
      newScores[turn] += 1;
      setScore(newScores);
    }

    if (deck.length === 0 && turn === players.length - 1) {
      const newWonCards = boardCards;
      newWonCards[turn] = [...newWonCards[turn], ...boardCards];
      removeCardsFromBoard(boardCards);
      setWonCards(newWonCards);
    }

    setCardToPlay(null);
    setCardsToTake([]);
    setTurn((turn + 1) % players);
  };

  const playIsDisabled =
    cardToPlay === null ||
    (sumOfCardValues([cardToPlay]) !== sumOfCardValues(cardsToTake) &&
      userCanPlayMove(hands[turn], boardCards));

  const dealIsDisabled = isDealDisabled(hands) && deck.length !== 0;

  return (
    <AppContainer>
      <GlobalStyles />
      {players && (
        <div>
          {score.map((s, index) => {
            return <h2 key={index}>S - {s}</h2>;
          })}
        </div>
      )}
      {players === null && <button onClick={() => setPlayers(1)}>2</button>}
      {hands.map((hand, index) => {
        return (
          <Player
            isTurn={turn === index}
            key={index}
            score={score[index]}
            wonCards={wonCards[index]}
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
      <button disabled={playIsDisabled} onClick={() => playCard()}>
        Play Card
      </button>
      <button onClick={() => dealToPlayers()} disabled={dealIsDisabled}>
        DEAL
      </button>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
