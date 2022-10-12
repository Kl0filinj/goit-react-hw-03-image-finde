import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './searchbar.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onInputChange = evt => {
    // this.setState({
    //   query: evt.target.value,
    // });
    setQuery(evt.target.value);
  };
  const onSubmitHandler = evt => {
    evt.preventDefault();
    onSubmit(query);
  };

  return (
    <header className="searchBar">
      <form className="searchForm" onSubmit={onSubmitHandler}>
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label ">Search</span>
        </button>

        <input
          onChange={onInputChange}
          value={query}
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
