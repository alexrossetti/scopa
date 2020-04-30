import React from 'react';
import styled from 'styled-components';

import Card from '../Card';

export default function Player({
  isTurn,
  score,
  wonCards = [],
  hand,
  cardToPlay,
  setCardToPlay,
}) {
  const toggleCardToPlay = card => {
    if (cardToPlay === card) {
      setCardToPlay(null);
    } else {
      setCardToPlay(card);
    }
  };

  return (
    <Wrapper isTurn={isTurn}>
      {hand &&
        hand.map((card, index) => {
          return (
            <Card
              key={index}
              isSelected={card === cardToPlay}
              card={card}
              onCardClick={toggleCardToPlay}
            />
          );
        })}
      {/* <h4>Won Cards - {wonCards.length}</h4> */}
      {/* <h3>Score - {score}</h3> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 180px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
  background: ${props => (props.isTurn ? 'green' : 'inherit')};
`;
