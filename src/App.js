import { useState, useEffect } from 'react';
import './App.css';
import PokemonInfos from './PokemonInfo';
import Search from './search.js';
import Filters from './filter'; 

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [types, setTypes] = useState({});
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [language, setLanguage] = useState("fr");

  useEffect(() => {
    fetch('https://pokedex-api.3rgo.tech/api/pokemon')
      .then((response) => response.json())
      .then((result) => {
        console.log();
        const pokemonData = result.data || [];
        setPokemons(pokemonData);
        setFilteredPokemons(pokemonData);
      })
      

    fetch('https://pokedex-api.3rgo.tech/api/types')
      .then((response) => response.json())
      .then((result) => {
        console.log();
        const typesData = result.data || [];
        const typesPokemon = typesData.reduce((acc, type) => {
          acc[type.id] = type.name;
          return acc;
        }, {});
        setTypes(typesPokemon);
      })
      
  }, []);

  const handleFilterChange = (generation, type) => {
    setSelectedGeneration(generation);
    setSelectedType(type);
    let filtered = pokemons;

    if (generation) {
      filtered = filtered.filter(pokemon => pokemon.generation === parseInt(generation));
    }

    if (type) {
      filtered = filtered.filter(pokemon => pokemon.types.includes(parseInt(type)));
    }

    setFilteredPokemons(filtered);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sorted = [...filteredPokemons];
  
    switch (option) {
      case "id":
        sorted.sort((a, b) => a.id - b.id);
        break;
      case "name":
        sorted.sort((a, b) => a.name[language].localeCompare(b.name[language]));
        break;
      case "weight":
        sorted.sort((a, b) => a.weight - b.weight);
        break;
      case "height":
        sorted.sort((a, b) => a.height - b.height); 
        break;
      default:
        break;
    }
  
    setFilteredPokemons(sorted);
  };

  return (
    <div className="App">
      <button className="language-button" onClick={() => setLanguage(language === "fr" ? "en" : "fr")} >
        {language === "fr" ? "EN" : "FR"}
      </button>
  
      <Search pokemons={pokemons} setFilteredPokemons={setFilteredPokemons} language={language} />
            
      <Filters 
        generations={[...new Set(pokemons.map(p => p.generation))].map(gen => ({ id: gen, name: { fr: `Génération ${gen}` } }))}
        types={Object.keys(types).map(id => ({ id, name: { fr: types[id]?.fr, en: types[id]?.en } }))}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        language={language}
      />

      <header className="App-header">
      <h1 className="App-title">{language === "fr" ? "Liste des Pokemon" : "Pokemon list"}</h1>
        <div className="pokemon-cart">
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card" onClick={() => setSelectedPokemon(pokemon)} style={{ cursor: 'pointer' }}>
              <h2>#{pokemon.id} {pokemon.name[language]}</h2>
              <img src={pokemon.image} alt={pokemon.name[language]} className="pokemon-image" />
              <p><strong>{language === "fr" ? "Génération" : "Generation"} :</strong> {pokemon.generation}</p>
              <p><strong>{language === "fr" ? "Types" : "Types"} :</strong> {pokemon.types.map(typeId => types[typeId]?.[language] || (language === "fr" ? "Inconnu" : "Unknown")).join(', ')}</p>
            </div>
          ))}
        </div>

        {selectedPokemon && (
          <PokemonInfos 
            pokemon={selectedPokemon} 
            onClose={() => setSelectedPokemon(null)} 
            types={types} 
            language={language} 
          />
        )}
      </header>
    </div>
  );
}

export default App;