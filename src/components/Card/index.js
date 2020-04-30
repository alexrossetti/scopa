import React from 'react';
import styled from 'styled-components';

export default function Card({ card, cardToPlay, setCardToPlay }) {
  if (!card) {
    return <Wrapper isSelected={false}> -- </Wrapper>;
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
      <Value>{value}</Value>
      <Suit>{suit}</Suit>
      {/* {value} {suit.charAt(0)} */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100px;
  height: 150px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => (props.isSelected ? '#ffa' : 'white')};

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Value = styled.div``;
const Suit = styled.div``;
