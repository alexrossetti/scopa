import React from 'react';
import styled from 'styled-components';

export default function Card({ card, cardToPlay, setCardToPlay }) {
  if (!card) {
    return <div> -- </div>;
  }

  const [value, suit] = [card.split(' ')[0], card.split(' ')[1]];

  const toggleCardToPlay = () => {
    if (cardToPlay === card) {
      setCardToPlay(null);
    } else {
      setCardToPlay(card);
    }
  };

  return (
    <Wrapper
      isSelected={cardToPlay === card}
      onClick={() => toggleCardToPlay()}
    >
      {value} {suit.charAt(0)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => (props.isSelected ? '#ffa' : 'inherit')};

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
