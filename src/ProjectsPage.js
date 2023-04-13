import React from 'react';
import { useTrail, animated, useSpring } from 'react-spring';
import './App.css';

const ProjectCard = ({ title, url }) => {
  const [hovered, setHovered] = React.useState(false);

  const hoverSpring = useSpring({
    transform: hovered ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: hovered ? '#61dafb' : '#282c34',
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div
      style={hoverSpring}
      className="projects-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </animated.div>
  );
};

const ProjectsPage = () => {
  const projectLinks = [
    { title: 'Project 1', url: 'https://example.com/link1' },
    { title: 'Project 2', url: 'https://example.com/link2' },
    { title: 'Project 3', url: 'https://example.com/link1' },
    { title: 'Project 4', url: 'https://example.com/link2' },
    // Add more links as needed
  ];

  const trail = useTrail(projectLinks.length, {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="projects-container">
      <h2>Projects</h2>
      <div className="projects-cards">
        {trail.map((props, index) => (
          <animated.div key={index} style={props}>
            <ProjectCard title={projectLinks[index].title} url={projectLinks[index].url} />
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
