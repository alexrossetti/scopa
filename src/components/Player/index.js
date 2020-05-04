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
      <InfoBar>
        <div>Score: {score}</div>
        <div>WonCards: {wonCards.length}</div>
      </InfoBar>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 10px;
  background: ${props => (props.isTurn ? 'green' : 'inherit')};
`;

const InfoBar = styled.div`
  width: 100%;
  background: #000;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
`;
