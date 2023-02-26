import React from 'react';

import './votes.css'

const Votes: React.FC<{average: number, votes: number}> = ({average, votes}) => (
  <div className="votes" title={`${average}/10 with ${votes} votes`}>
    🎬🎬🎬🎬🎬🎬🎬🎬🎬🎬
    <span style={{ left: `${(average/10)*100}%` }} />
  </div>
)

export default Votes
