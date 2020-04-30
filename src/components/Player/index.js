import React from 'react';
import Card from '../Card';
import styled from 'styled-components';

export default function Player({
  isTurn,
  score,
  wonCards = [],
  hand,
  cardToPlay,
  setCardToPlay,
}) {
  return (
    <Wrapper isTurn={isTurn}>
      {hand &&
        hand.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              cardToPlay={cardToPlay}
              setCardToPlay={setCardToPlay}
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
