import React, { useEffect, useState } from 'react';

import { cardValues } from '../../constants/cards';
import Card from '../Card';
import {
  Wrapper,
  Container,
  DeckContainer,
  Deck,
  BoardContainer,
} from './styles';

export default function Board({
  cardToPlay,
  boardCards,
  cardsToTake,
  setCardsToTake,
  cardsRemaining = 0,
  dealToPlayers,
  dealIsDisabled,
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

  return (
    <Wrapper>
      <DeckContainer>
        <Deck>{cardsRemaining} cards remaining</Deck>
        {cardsRemaining !== 0 && (
          <button onClick={() => dealToPlayers()} disabled={dealIsDisabled}>
            DEAL
          </button>
        )}
      </DeckContainer>
      <Container>
        <BoardContainer>
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
        </BoardContainer>
      </Container>
    </Wrapper>
  );
}
