import { useState } from "react";

function Filters({ generations, types, onFilterChange, onSortChange, language = "fr" }) {
  const [selectedGeneration, setSelectedGeneration] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleGenerationChange = (event) => {
    const generation = event.target.value;
    setSelectedGeneration(generation);
    onFilterChange(generation, selectedType);
  };
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    onFilterChange(selectedGeneration, type);
  };
  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOption(sort);
    onSortChange(sort);
  };
  return (
    <div className="filter">
      <label>
        {language === "fr" ? "Génération" : "Generation"}:
        <select value={selectedGeneration} onChange={handleGenerationChange}>
          <option value="">{language === "fr" ? "Toutes" : "All"}</option>
          {generations.map((generation) => (
            <option key={generation.id} value={generation.id}>
              {language === "fr" ? `Génération ${generation.id}` : `Generation ${generation.id}`}
            </option>
          ))}
        </select>
      </label>
      <label>
        {language === "fr" ? "Type" : "Type"}:
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">{language === "fr" ? "Tous" : "All"}</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name[language]}
            </option>
          ))}
        </select>
      </label>
      <label>
        {language === "fr" ? "Trier par" : "Sort by"}:
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">{language === "fr" ? "Par défaut" : "Default"}</option>
          <option value="name">{language === "fr" ? "Nom" : "Name"}</option>
          <option value="id">{language === "fr" ? "Numéro" : "Number"}</option>
          <option value="weight">{language === "fr" ? "Poids" : "Weight"}</option> 
          <option value="height">{language === "fr" ? "Taille" : "Height"}</option> 
        </select>
      </label>
    </div>
  );
}

export default Filters;