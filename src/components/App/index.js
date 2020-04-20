import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../styles';
import { setupShuffledDeck } from '../../utils/deckUtils';
import { score } from '../../utils/scoreUtils';
import Player from '../Player';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [players, setPlayers] = useState(null);
  const [hands, setHands] = useState([]);
  const [boardCards, setBoardCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (players) {
      setHands(new Array(players));
    }
    setDeck(setupShuffledDeck());
    dealToBoard();
    dealToPlayers();
  }, [players]);

  const dealToBoard = () => {
    const items = deck.splice(0, 4);
    setBoardCards([...boardCards, items]);
  };

  const dealToPlayers = () => {
    const newHands = [];
    for (let i = 0; i < players; i++) {
      const items = deck.splice(0, 3);
      newHands.push(items);
    }
    setHands(newHands);
  };

  const playCard = card => {
    setTurn(turn + (1 % players.length));

    // add card to board - check if it matches other cards already on te board?
  };

  console.log('deck', deck);

  return (
    <AppContainer>
      <GlobalStyles />
      {players === null && <button onClick={() => setPlayers(2)}>2</button>}
      {/* {players && <button onClick={() => dealToPlayers()}>deal</button>}
      {players && <button onClick={() => dealToBoard()}>deal to board</button>} */}
      {hands.map(hand => {
        return <Player cards={hand} />;
      })}
      <br />
      <br />
      {boardCards.map(card => {
        return <div>{card}</div>;
      })}
    </AppContainer>
  );
}

const AppContainer = styled.div``;
