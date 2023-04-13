import React from 'react';
import { useTrail, animated, useSpring } from 'react-spring';
import './App.css';

const HomeworkCard = ({ title, url }) => {
  const [hovered, setHovered] = React.useState(false);

  const hoverSpring = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: hovered ? '#61dafb' : '#282c34',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={hoverSpring}
      className="homework-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </animated.div>
  );
};

const HomeworkPage = () => {
  const homeworkLinks = [
    { title: 'Homework 1', url: '#' },
    { title: 'Rancid Tomatoes', url: 'https://codd.cs.gsu.edu/~rkrisko1/HW/hw2/tmnt.html' },
    { title: 'Nerdluv', url: 'https://codd.cs.gsu.edu/~rkrisko1/HW/hw3/index.php' },
    { title: 'RipMatch', url: 'https://codd.cs.gsu.edu/~rkrisko1/HW/hw4/ripmatch.html' },
    // Add more links as needed
  ];

  const trail = useTrail(homeworkLinks.length, {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="homework-container">
      <h2>Homework</h2>
      <div className="homework-cards">
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            <HomeworkCard title={homeworkLinks[index].title} url={homeworkLinks[index].url} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkPage;
