import React, { useState } from 'react';
import './SearchPage.css';

const SearchPage = () => {
  const [characters, setCharacters] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  let data;
  let data1;

  const handleFilter = async (event) => {
    let key = event.target.value;
    let keyLength = event.target.value.length;
    setWordEntered(key);
    console.log(key.value);
    if (keyLength > 1) {
      let result = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${key}&apikey=7e62590a190f7230096f8329981236e7`
      );
      data = await result.json();
      data1 = await data.data.results;

      if (result) {
        setCharacters(data1);
      } else setCharacters([]);
    } else {
      setCharacters([]);
    }
  };

  const clearInput = () => {
    setCharacters([]);
    setWordEntered('');
  };

  return (
    <div className="search">
      Search Marvel API
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Enter Character Name..."
          value={wordEntered}
          onChange={handleFilter}
        />
        &nbsp;&nbsp;
        <div className="searchIcon">
          {characters.length === 0 ? (
            <div>SEARCH</div>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              CLEAR
            </div>
          )}
        </div>
      </div>
      {characters.length !== 0 && (
        <div className="dataResult">
          {characters.slice(0, 10).map((value, key) => {
            return (
              <a
                className="dataItem"
                href={`${value.thumbnail.path}.${value.thumbnail.extension}`}
                target="_blank"
              >
                <p>{value.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
