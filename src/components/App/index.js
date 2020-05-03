import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import Player from '../Player';
import { sumOfCardValues } from '../../utils/cardUtils';
import Board from '../Board';
import { userCanPlayMove, isDealDisabled } from '../../utils/gameUtils';

const initialState = {
  boardCards: [],
  players: [
    {
      hand: [],
      wonCards: [],
      score: 0,
    },
  ],
  turn: 0,
  cardToPlay: null,
  cardsToTake: [],
};

const initialPlayerObject = {
  hand: [],
  wonCards: [],
  score: 0,
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [hands, setHands] = useState([]);
  const [wonCards, setWonCards] = useState([]);
  const [score, setScore] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);
  const [cardToPlay, setCardToPlay] = useState(null);
  const [cardsToTake, setCardsToTake] = useState([]);
  const playerCount = 1;

  useEffect(() => {
    setPlayers(new Array(playerCount).fill(initialPlayerObject));
    if (players) {
      setHands(new Array(1));
      setScore(new Array(1).fill(0));
      setWonCards(new Array(1).fill([]));
    }
    setDeck(setupShuffledDeck());
  }, []);

  useEffect(() => {
    if (deck.length === 40) {
      dealToBoard();
    }
  }, [deck]);

  const dealToBoard = () => {
    const items = deck.slice(0, 4);
    setBoardCards(items);
    setDeck(deck => deck.filter(c => !items.includes(c)));
  };

  const dealToPlayers = () => {
    const newPlayers = players;

    for (let i = 0; i < players.length; i++) {
      const items = deck.slice(0, 3);
      newPlayers[i] = { ...newPlayers[i], hand: items };
      setDeck(deck => deck.filter(c => !items.includes(c)));
    }

    setPlayers(newPlayers);
  };

  console.log(players);

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
    }

    // if the user played a scopa, add a point to their score
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
      userCanPlayMove(hands[turn], boardCards)) ||
    (!userCanPlayMove(hands[turn], boardCards) && cardsToTake.length !== 0);

  const dealIsDisabled = isDealDisabled(hands) && deck.length !== 0;

  return (
    <AppContainer>
      <GlobalStyles />
      {/* {players && (
        <div>
          {score.map((s, index) => {
            return <h2 key={index}>S - {s}</h2>;
          })}
        </div>
      )}
      {players === null && <button onClick={() => setPlayers(1)}>2</button>} */}
      {players.map((player, index) => {
        const { hand, wonCards, score } = player;
        return (
          <Player
            isTurn={turn === index}
            key={index}
            score={score}
            // score={score[index]}
            // wonCards={wonCards[index]}
            wonCards={wonCards}
            hand={hand}
            // hand={hands[index]}
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
