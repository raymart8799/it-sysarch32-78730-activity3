import React, { useState, useEffect } from 'react';
import Pokemon from './pokemon';

function Pokedex () {
  const [list, setList] = useState([]);
  const [language, setLanguage] = useState('english');

  useEffect(() => {
    fetch("https://us-central1-it-sysarch32.cloudfunctions.net/pokemon")
      .then(response => response.json())
      .then(data => setList(data));
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const chunkedList = list.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 3);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <div className="pokedex">
      <div className="language-buttons">
        <button onClick={() => handleLanguageChange('english')}>English</button>
        <button onClick={() => handleLanguageChange('japanese')}>Japanese</button>
        <button onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <button onClick={() => handleLanguageChange('french')}>French</button>
      </div>
      <div className="pokemon-list">
        {chunkedList.map((chunk, index) => (
          <div key={index} className="pokemon-row">
            {chunk.map(pokemon => (
              <Pokemon key={pokemon.id} pokemon={pokemon} language={language} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;