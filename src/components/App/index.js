import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import { score } from '../../utils/scoreUtils';
import Player from '../Player';
import { primieraScoring, cardValues } from '../../constants/cards';
import { getAllPossibleSums, sumOfCardValues } from '../../utils/cardUtils';
import Board from '../Board';
import { userCanPlayMove, isDealDisabled } from '../../utils/gameUtils';

// TODO: deals twice when you click deal for some reason -- look up splice/slice functions?

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (players) {
      setHands(new Array(players));
      setScore(new Array(players).fill(0));
      setWonCards(new Array(players).fill([]));
    }
    setDeck(setupShuffledDeck());
    dealToBoard();
    dealToPlayers();
  }, [players]);

  const dealToBoard = () => {
    const items = deck.splice(0, 4);
    setBoardCards(items);
    setDeck(deck => deck.splice(4));
  };

  const dealToPlayers = () => {
    const newHands = [];
    for (let i = 0; i < players; i++) {
      const items = deck.splice(0, 3);
      newHands.push(items);
      setDeck(deck => deck.splice(3));
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
    // console.log()
    setBoardCards(newBoardCards);
    // remove the selected card or cards from the board
    // return null;
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
      newScore[turn] += 1;
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

  // console.log('board sums', boardSums);
  // console.log('wonCards', wonCards);
  // console.log('hands', hands.flat());
  console.log('deck', deck);

  return (
    <AppContainer>
      <GlobalStyles />
      {players && (
        <div>
          {score.map(s => {
            return <h2>S - {s}</h2>;
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
