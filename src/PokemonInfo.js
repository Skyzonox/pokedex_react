import React from 'react';

function PokemonInfos({ pokemon, onClose, types, language }) {
  return (
    <div className="pokemon-info">
      <div className="pokemon-content">
        <button onClick={onClose}>{language === "fr" ? "Fermer" : "Close"}</button>
        <h2>#{pokemon.id} {pokemon.name[language]}</h2>
        <img src={pokemon.image} alt={pokemon.name[language]} className="pokemon-detail-image"/>
        <div className="pokemon-details">
          <p><strong>{language === "fr" ? "Génération" : "Generation"}:</strong> {pokemon.generation}</p>
          <p><strong>Types:</strong> {pokemon.types.map(typeId => 
            types[typeId] ? types[typeId][language] : (language === "fr" )
          ).join(', ')}</p>
          <p><strong>HP:</strong> {pokemon.stats.hp}</p>
          <p><strong>{language === "fr" ? "Attaque" : "Attack"}:</strong> {pokemon.stats.atk}</p>
          <p><strong>{language === "fr" ? "Défense" : "Defense"}:</strong> {pokemon.stats.def}</p>
          <p><strong>{language === "fr" ? "Attaque Spéciale" : "Special Attack"}:</strong> {pokemon.stats.spe_atk}</p>
          <p><strong>{language === "fr" ? "Défense Spéciale" : "Special Defense"}:</strong> {pokemon.stats.spe_def}</p>
          <p><strong>{language === "fr" ? "Vitesse" : "Speed"}:</strong> {pokemon.stats.vit}</p>
          <p><strong>{language === "fr" ? "Poids" : "Weight"}:</strong> {pokemon.weight} kg</p>
          <p><strong>{language === "fr" ? "Taille" : "Height"}:</strong> {pokemon.height} m</p>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfos;