import React from 'react';
import styled from 'styled-components';

export default function Card({ isSelected, card, onCardClick }) {
  if (!card) {
    return <Wrapper isSelected={false}> -- </Wrapper>;
  }

  const [value, suit] = [card.split(' ')[0], card.split(' ')[1]];

  return (
    <Wrapper isSelected={isSelected} onClick={() => onCardClick(card)}>
      <Value>{value}</Value>
      <Suit>{suit}</Suit>
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
