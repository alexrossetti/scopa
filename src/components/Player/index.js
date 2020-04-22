import React from 'react';
import Card from '../Card';
import styled from 'styled-components';

export default function Player({ score, hand, cardToPlay, setCardToPlay }) {
  return (
    <Wrapper>
      {hand.map(card => {
        return (
          <Card
            card={card}
            cardToPlay={cardToPlay}
            setCardToPlay={setCardToPlay}
          />
        );
      })}
      {/* <h3>Score - {score}</h3> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
  margin-top: 20px;
  width: 100%;
  justify-content: center;
`;
