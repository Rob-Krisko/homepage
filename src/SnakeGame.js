import React, { useState, useEffect } from 'react';
import './SnakeGame.css';
import Leaderboard from './Leaderboard';


const GameStart = ({ onStart }) => (
  <div className="snake-game-start">
    <h1>Snake Game</h1>
    <button onClick={onStart}>Start Game</button>
  </div>
);

const GameOver = ({ onRestart, newHighScore, score, onSubmit, userName, setUserName }) => (
  <div className="snake-game-over">
    <h1>Game Over</h1>
    {newHighScore && <p>New High Score: {score}</p>}
    <form onSubmit={onSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
    <button onClick={onRestart}>Restart</button>
  </div>
);

const SnakeGame = () => {
  const boardSize = 25;
  const cellSize = 20;

  const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(null);
  const [score, setScore] = useState(0);

  const [leaderboard, setLeaderboard] = useState([
    { name: 'Player 1', score: 10 },
    { name: 'Player 2', score: 8 },
    { name: 'Player 3', score: 6 },
    { name: 'Player 4', score: 4 },
    { name: 'Player 5', score: 2 },
  ]);
  const [userName, setUserName] = useState('');

  const updateLeaderboard = () => {
    if (score > leaderboard[leaderboard.length - 1].score) {
      setLeaderboard(
        [
          ...leaderboard,
          { name: userName || 'Anonymous', score },
        ].sort((a, b) => b.score - a.score).slice(0, 10)
      );
    }
  };

  useEffect(() => {
    if (gameStarted === false && !gameOver) {
      const interval = setInterval(moveSnake, 200);
      return () => clearInterval(interval);
    }
  }, [snake, gameOver, gameStarted]);

  const generateFood = () => {
    let x = Math.floor(Math.random() * boardSize);
    let y = Math.floor(Math.random() * boardSize);
    while (snake.some(cell => cell.x === x && cell.y === y)) {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    }
    return { x, y };
  };

  const checkCollision = (head) => {
    return head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.some(cell => cell.x === head.x && cell.y === head.y);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    updateLeaderboard();
    setUserName('');
  };
  

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[newSnake.length - 1] };

    switch (direction) {
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      default:
        break;
    }

    if (checkCollision(head)) {
      setGameOver(true);
      return;
    }
    

    if (head.x === food.x && head.y === food.y) {
      setFood(generateFood());
      setSnake((prevSnake) => [...prevSnake, {}]);
      setScore(prevScore => prevScore + 1);
    } else {
      newSnake.shift();
    }

    newSnake.push(head);
    setSnake(newSnake);
  };

  const handleKeyPress = (e) => {
    if (gameOver) return;
  
    e.preventDefault();
    const { key } = e;
    if (key === 'ArrowUp' && direction !== 'down') setDirection('up');
    if (key === 'ArrowDown' && direction !== 'up') setDirection('down');
    if (key === 'ArrowLeft' && direction !== 'right') setDirection('left');
    if (key === 'ArrowRight' && direction !== 'left') setDirection('right');
  };
  

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);
  

  return (
    <div className="snake-game-container">
      <div className="current-score">Score: {score}</div>
      <Leaderboard leaderboard={leaderboard} userName={userName} />
      <div
        className="snake-game-board"
        style={{
          width: `${boardSize * cellSize}px`,
          height: `${boardSize * cellSize}px`,
        }}
      >
        {snake.map((cell, index) => (
          <div
            key={index}
            className="snake-game-cell"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${cell.x * cellSize}px`,
              top: `${cell.y * cellSize}px`,
            }}
          ></div>
        ))}
        <div
          className="snake-game-food"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${food.x * cellSize}px`,
            top: `${food.y * cellSize}px`,
          }}
        ></div>
        {gameStarted === null && (
          <GameStart onStart={() => setGameStarted(false)} />
        )}
        {gameOver && (
          <GameOver
            onRestart={() => {
              setSnake([{ x: 2, y: 2 }]);
              setFood({ x: 5, y: 5 });
              setDirection('right');
              setGameOver(false);
              setGameStarted(false);
              setScore(0);
            }}
            newHighScore={score > leaderboard[leaderboard.length - 1].score}
            score={score}
            onSubmit={handleNameSubmit}
            userName={userName}
            setUserName={setUserName}
          />
        )}


      </div>
    </div>
  );
  
}
  

export default SnakeGame;

