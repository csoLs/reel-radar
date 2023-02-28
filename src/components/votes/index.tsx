import React from 'react';

import './votes.css'

const Votes: React.FC<{average: number, votes: number}> = ({ average, votes }) => {
  const avg  = average < 0 ? 0 : average > 10 ? 10 : average
  return (
    <div className="votes" title={`${average}/10 with ${votes} votes`}>
      🎬🎬🎬🎬🎬🎬🎬🎬🎬🎬
      <span style={{ left: `${(avg/10)*100}%`, width: `${100 - ((avg/10)*100)}%`  }} data-cy="average" />
    </div>
  )
}

export default Votes
