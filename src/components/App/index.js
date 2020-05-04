import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Player from '../Player';
import Board from '../Board';
import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import { isDealDisabled, isPlayDisabled } from '../../utils/gameUtils';
import { cards, suits } from '../../constants/cards';

// const initialState = {
//   boardCards: [],
//   players: [],
//   turn: 0,
//   cardToPlay: null,
//   cardsToTake: [],
//   lastMoveIndex: null
// };

const initialPlayerObject = {
  hand: [],
  wonCards: [],
  score: 0,
};

export default function App() {
  const [players, setPlayers] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);
  const [cardToPlay, setCardToPlay] = useState(null);
  const [cardsToTake, setCardsToTake] = useState([]);
  const playerCount = 1;
  const [lastMoveIndex, setLastMoveIndex] = useState(null);

  useEffect(() => {
    setupGame();
  }, []);

  useEffect(() => {
    const deckSize = cards.length * suits.length;
    if (deck.length === deckSize) {
      dealToBoard();
    }
  }, [deck]);

  const setupGame = () => {
    setPlayers(new Array(playerCount).fill(initialPlayerObject));
    setDeck(setupShuffledDeck());
  };

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

  const removeCardFromHand = card => {
    const newPlayers = players;

    const newHand = newPlayers[turn].hand;
    const cardIndex = newHand.findIndex(c => c === card);
    newHand[cardIndex] = null;

    const newPlayer = { ...newPlayers[turn], hand: newHand };
    newPlayers[turn] = newPlayer;

    setPlayers(newPlayers);
  };

  const removeCardsFromBoard = cards => {
    const newBoardCards = boardCards.filter(c => !cards.includes(c));
    setBoardCards(newBoardCards);
  };

  // TODO: at the end of the game, give all remaining cards to the last player to make a valid move
  const endGame = () => {
    // if (isLastTurn(deck, players)) {
    //   console.log('in here', players[turn].hand);
    //   newWonCards = [...newWonCards, ...boardCards];
    //   setBoardCards([]);
    // } else {
    //   newWonCards = [...newWonCards, ...cardsToTake];
    // }
  };

  const takeCards = card => {
    const newPlayers = players;
    const takeCards = [cardToPlay, ...cardsToTake];

    // set the new hand for the player
    const newHand = newPlayers[turn].hand;
    const cardIndex = newHand.findIndex(c => c === card);
    newHand[cardIndex] = null;

    // set the new score for the player - if the user played a scopa, add a point to their score
    let newScore = newPlayers[turn].score;

    if (boardCards.length === 0 && deck.length > 0) {
      newScore += 1;
    }

    // set the new wonCards for the player
    let newWonCards = [
      ...newPlayers[turn].wonCards,
      cardToPlay,
      ...cardsToTake,
    ];

    // update the new player object
    const newPlayer = {
      ...newPlayers[turn],
      score: newScore,
      hand: newHand,
      wonCards: newWonCards,
    };

    newPlayers[turn] = newPlayer;
    setPlayers(newPlayers);
    setLastMoveIndex(turn);
  };

  const playCard = () => {
    if (!cardsToTake.length) {
      // remove card from hand - add card to board
      removeCardFromHand(cardToPlay);
      setBoardCards([...boardCards, cardToPlay]);
    } else {
      // remove card from hand and add won cards to wonCards array for the player - remove selected cards from board
      takeCards(cardToPlay);
      removeCardsFromBoard(cardsToTake);
    }

    setCardToPlay(null);
    setCardsToTake([]);
    setTurn((turn + 1) % players.length);
  };

  const dealIsDisabled = isDealDisabled(players);
  const playIsDisabled = isPlayDisabled(
    cardToPlay,
    cardsToTake,
    players,
    turn,
    boardCards
  );

  console.log('PLAYERS: ', players);

  return (
    <AppContainer>
      <GlobalStyles />
      {players.map((player, index) => {
        const { hand, wonCards, score } = player;
        return (
          <Player
            key={index}
            isTurn={turn === index}
            score={score}
            wonCards={wonCards}
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
        cardsRemaining={deck.length}
        dealToPlayers={dealToPlayers}
        dealIsDisabled={dealIsDisabled}
      />
      <button disabled={playIsDisabled} onClick={() => playCard()}>
        Play Card
      </button>
    </AppContainer>
  );
}

const AppContainer = styled.div``;
