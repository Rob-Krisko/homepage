import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ leaderboard, userName }) => (
  <div className="snake-game-leaderboard">
    <h2>Leaderboard</h2>
    <ol>
      {leaderboard.map((entry, index) => (
        <li key={index}>
          {entry.name} - {entry.score}
        </li>
      ))}
    </ol>
  </div>
);

export default Leaderboard;
