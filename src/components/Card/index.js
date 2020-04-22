import React from 'react';

export default function Card({ card, onClick }) {
  if (!card) {
    return <div> -- </div>;
  }

  const [value, suit] = [card.split(' ')[0], card.split(' ')[1]];

  return (
    <div onClick={() => onClick()}>
      {value} {suit.charAt(0)}
    </div>
  );
}
