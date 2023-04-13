import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { animated, useSpring } from 'react-spring';
import './App.css';
import SnakeGame from './SnakeGame';
import ClassworkPage from './ClassworkPage';
import HomeworkPage from './HomeworkPage';
import ProjectsPage from './ProjectsPage';


const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { duration: 1000 },
  });

  const dropdownAnimation = useSpring({
    opacity: dropdownOpen ? 1 : 0,
    maxHeight: dropdownOpen ? '500px' : '0px',
    transform: dropdownOpen
      ? 'translate3d(0, 0, 0) rotateX(0deg)'
      : 'translate3d(0, -20px, 0) rotateX(-90deg)',
    config: { tension: 200, friction: 20 },
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <animated.header style={headerAnimation} className="App-header">
      <h1>Welcome to My React Homepage!</h1>
      <nav className="dropdown" ref={dropdownRef}>
        <Link to="/" className="home-button">
          Home
        </Link>
        <button className="dropdown-toggle home-button" onClick={toggleDropdown}>
          Menu
        </button>
        <animated.ul
          className={`dropdown-menu${dropdownOpen ? ' show' : ''}`}
          style={dropdownAnimation}
        >
          <li>
            <Link to="/classwork" onClick={closeDropdown}>
              Classwork
            </Link>
          </li>
          <li>
            <Link to="/homework" onClick={closeDropdown}>
              Homework
            </Link>
          </li>
          <li>
            <Link to="/projects" onClick={closeDropdown}>
              Projects
            </Link>
          </li>
          <li>
            <a href="#spotify" onClick={closeDropdown}>
              Linked In
            </a>
          </li>
          <li>
            <a href="#" onClick={closeDropdown}>
              Github
            </a>
          </li>
          <li>
            <a href="#" onClick={closeDropdown}>
              GSU Comp Sci
            </a>
          </li>
        </animated.ul>
      </nav>
    </animated.header>
  );
};


const InfoSection = () => {
  const infoAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 50px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: { duration: 1000 },
    delay: 1000,
  });

  return (
    <animated.section style={infoAnimation} className="App-info">
      {['About Me', 'Hobbies', 'Education / Goals', 'Spotify Playlist'].map((title, index) => (
        <div key={index} className="section" style={{ minHeight: `calc(100vh - 200px)` }}>
          <h2 className="section-title">{title}</h2>
          {title === 'About Me' ? (
            <div className="section-content about-me-container">
              <div className="about-me-text">
                <p>
                  My love for computers and programming began when I was a child. As I grew older, my passion for
                  technology only grew stronger. My experience as a Submarine Sonar Technician has allowed me to
                  deepen my understanding of complex systems and develop skills that have translated well into the
                  field of computer science.
                </p>
              </div>
              <div className="about-me-image">
                <img src="me.jpg" alt="Your Name" />
              </div>
            </div>
          ) : title === 'Hobbies' ? (
            <div className="section-content">
              <p>
                My hobbies include trying new foods, traveling with my fiancee, playing video games, listening to music, and watching hockey. I am a huge fan of the Boston Bruins, and I never miss a game if I can help it. I love exploring new places with my fiancee, and we are always on the lookout for our next adventure. Music has always played a big role in my life, and I enjoy discovering new artists and genres.
              </p>
              <div className="hobbies-button-container">
                <Link className="hobbies-button" to="/snake-game">Check out this snake game I created!</Link>
              </div>
            </div>
          ) : title === 'Education / Goals' ? (
            <div className="section-content">
              <div className="education-goals">
                <div className="education">
                  <h3>Education</h3>
                  <ul className="list">
                    <li>
                      GSU Main Campus
                      <ul>
                        <li>Majoring in computer science with focuses on web design and cyber security</li>
                      </ul>
                    </li>
                    <li>
                      GSU Perimeter
                      <ul>
                        <li>Associates degree in Engineering</li>
                      </ul>
                    </li>
                    <li>
                      SONAR A-School
                      <ul>
                        <li>Focus on ARCI combat systems</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="goals">
                  <h3>Dream Jobs</h3>
                  <ul className="list">
                    <li>Dream Job #1</li>
                    <li>Dream Job #2</li>
                    <li>Dream Job #3</li>
                  </ul>
                </div>
              </div>
              <div className="resume-link-container">
                <a href="rob-krisko-resume.pdf" className="resume-link" target="_blank" rel="noopener noreferrer">View my resume</a>
              </div>
            </div>
          ) : title === 'Spotify Playlist' ? (
            <iframe
              className="spotify-embed"
              src="https://open.spotify.com/embed/playlist/5eJqFy9KjqdjUMgvsUMA08?si"
              width="80%"
              height="100%"
              frameorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          ) : (
            <p className="section-content">
              Some interesting content about {title}.
              <span className="interactive-feature"> Click me for more!</span>
            </p>
          )}
        </div>
      ))}
    </animated.section>
  );
};


  
  const SnakeGamePage = () => {
    return (
      <div className="snake-game-page">
        <div className="snake-game-container">
          <SnakeGame />
        </div>
      </div>
    );
  };
  
  
  function App() {
    return (
      <Router>
        <div className="App">
          <Header />
          <div className="spacer"></div>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<InfoSection />} />
              <Route path="/snake-game" element={<SnakeGamePage />} />
              <Route path="/classwork" element={<ClassworkPage />} />
              <Route path="/homework" element={<HomeworkPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    );
  }
  
  
  export default App;