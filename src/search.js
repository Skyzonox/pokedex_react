import React, { useState, useEffect } from 'react';

function Search({ pokemons, setFilteredPokemons, language = "fr" }) {
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    if (search === '') {
      
      setFilteredPokemons(pokemons);
    } else {
      
      const results = pokemons.filter(pokemon => 
        pokemon.name[language].toLowerCase().includes(search.toLowerCase()) ||
        pokemon.id.toString().includes(search)
      );
      setFilteredPokemons(results);
    }
  }, [search, pokemons, setFilteredPokemons, language]);

  return (
    <div>
      <div className="search">
        <input type="text" placeholder={language === "fr" ? "Rechercher un Pokémon" : "Search for a Pokémon"} value={search}
          onChange={(event) => setSearch(event.target.value)}/>
      </div>
      
    </div>
  );
}

export default Search;