import React from 'react';

const ResultCard: React.FC<{score: number}> = ({score}) => {

  return (
    <div className="result-div">
        <h1>Score: {score}</h1>
        <h4>Press Button To Play Again</h4>
    </div>

  );
}

export default ResultCard;
