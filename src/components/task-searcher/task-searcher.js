import React from 'react';
import './task-searcher.scss';

const TaskSearcher = ({ setTerm, term }) => {

  const searchValue = (e) => {
    const value = e.target.value;
    setTerm(value);
  }

  return (
    <input
      className="search-input"
      type="text"
      placeholder="type to search..."
      value={ term }
      onChange={searchValue}/>
  );
}

export default TaskSearcher;