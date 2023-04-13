import React from 'react';
import { useTrail, animated, useSpring } from 'react-spring';
import './App.css';

const ClassworkCard = ({ title, url }) => {
  const [hovered, setHovered] = React.useState(false);

  const hoverSpring = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: hovered ? '#61dafb' : '#282c34',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={hoverSpring}
      className="classwork-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </animated.div>
  );
};

const ClassworkPage = () => {
  const classworkLinks = [
    { title: 'Classwork 0', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw0/index.html' },
    { title: 'Classwork 1', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw01/index01.html' },
    { title: 'Classwork 2', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw02/index02.html' },
    { title: 'Classwork 3', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw03/skeleton.html' },
    { title: 'Classwork 4', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw04/cw4.php' },
    { title: 'Classwork 5', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw05/buyagrade.html' },
    { title: 'Classwork 6', url: '#' },
    { title: 'Classwork 7', url: 'https://codd.cs.gsu.edu/~rkrisko1/CW/cw7/nonograms.html' },
    { title: 'Classwork 8', url: '#' },
    // Add more links as needed
  ];

  const trail = useTrail(classworkLinks.length, {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="classwork-container">
      <h2>Classwork</h2>
      <div className="classwork-cards">
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            <ClassworkCard title={classworkLinks[index].title} url={classworkLinks[index].url} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ClassworkPage;
