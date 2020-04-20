import React from 'react';

export default function Player({ cards }) {
  return (
    <div style={{ marginBottom: '50px' }}>
      {cards.map(card => {
        return <div>{card}</div>;
      })}
    </div>
  );
}
