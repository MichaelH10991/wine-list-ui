import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

const Test = ({ title, content }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDelete = () => {
    console.log('clicked')
    setIsVisible(false);
  };

  return (
    <Transition in={isVisible} timeout={500}>
      {(state) => (
        <div style={{
          transition: 'opacity 0.5s ease-out',
          opacity: state === 'exiting' ? 0 : 1,
          display: state === 'exiting' ? 'none' : 'block',
        }}>
          <div className="card1">
            <h2>{title}</h2>
            <p>{content}</p>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Test;