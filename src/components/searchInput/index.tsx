import React from 'react';

import './search.css'

const SearchInput: React.FC<{ onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({ onChange }) => {
  return (
    <div className='searchContainer'>
      <input className="searchInput" onChange={onChange} type="search" placeholder="Search for a movie…" name="q" />
    </div>
  )
}

export default SearchInput
