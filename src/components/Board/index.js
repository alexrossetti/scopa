import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { cardValues } from '../../constants/cards';

export default function Board({
  cardToPlay,
  boardCards,
  cardsToTake,
  setCardsToTake,
}) {
  const [selectedSum, setSelectedSum] = useState(0);

  useEffect(() => {
    const sum = cardsToTake.reduce((total, element) => {
      return (total += cardValues[element.split(' ')[0]]);
    }, 0);
    setSelectedSum(sum);
  }, [cardsToTake]);

  const onClick = card => {
    if (!cardToPlay) {
      return null;
    }
    if (cardsToTake.includes(card)) {
      const newCardsToTake = cardsToTake.filter(c => c !== card);
      setCardsToTake(newCardsToTake);
    } else {
      setCardsToTake([...cardsToTake, card]);
    }
  };

  // console.log('sum of selection', selectedSum);

  return (
    <Wrapper>
      {boardCards.map(card => {
        return (
          <Card
            isSelected={cardsToTake.includes(card)}
            onClick={() => onClick(card)}
          >
            {card}
          </Card>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border: 2px solid #333;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  background: green;
  margin: auto;
  width: 200px;
`;
const Card = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.isSelected ? '#faa' : 'inherit')};
`;
