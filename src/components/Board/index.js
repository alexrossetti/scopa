import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { cardValues } from '../../constants/cards';
import Card from '../Card';

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
    console.log('in function', card, cardToPlay);
    if (!cardToPlay) {
      return null;
    }
    if (cardsToTake.includes(card)) {
      console.log('here');
      const newCardsToTake = cardsToTake.filter(c => c !== card);
      setCardsToTake(newCardsToTake);
    } else {
      setCardsToTake([...cardsToTake, card]);
    }
  };

  return (
    <Wrapper>
      {boardCards.map(card => {
        return (
          <Card
            key={card}
            card={card}
            isSelected={cardsToTake.includes(card)}
            onCardClick={onClick}
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
  width: 300px;
`;
