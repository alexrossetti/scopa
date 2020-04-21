import React from 'react';

export default function Player({ hand, playCard }) {
  return (
    <div style={{ marginBottom: '50px' }}>
      {hand.map(card => {
        return <div onClick={() => playCard(hand, card)}>{card}</div>;
      })}
    </div>
  );
}
