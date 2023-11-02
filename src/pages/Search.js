import '../styles/Search.css'; 
import Navbar from "../components/Navbar" 
import back from "../components/assets/arrowBack.png";
import React, { useState } from "react";

export function Back(){
  return(
      <div className="backSearch"> 
          <a href="/"><img src={back} alt=""/></a>
      </div>
  )
}
// Component to represent a category and its subcategories
function Category({ category, subcategories, setVisibleSubcategories }) {
  const [selected, setSelected] = useState(false);

  const buttonStyle = {
    textAlign: 'left', 
  };


  const handleSelect = () => {
    setSelected(!selected);
    setVisibleSubcategories(subcategories);
  };

  return (
    <div className="Category">
      <button style={buttonStyle}onClick={handleSelect}>{category.name}</button>
      {selected && (
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory.name}>
              <button style={buttonStyle}>{subcategory.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Component to represent a publication
function Publication({ publication }) {
  const buttonStyle = {
    textAlign: 'left', 
  };

  return (
    <button style={buttonStyle}>{publication.name}</button>
  );
}


// Component to represent the search bar
function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [visibleSubcategories, setVisibleSubcategories] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleCategorySelect = (category) => {
    const subcategories = category.subcategories;
    setVisibleSubcategories(subcategories);
  };

  const filteredCategories = categories.filter((category) => {
    switch (filterType) {
      case "descripcion":
        return category.description.toLowerCase().includes(searchTerm.toLowerCase());
      case "Tags":
        return category.Tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      default:
        return category.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  const filteredPublications = publications.filter((publications) => {
    switch (filterType) {
      case "fecha":
        return publications.createdAt.toLowerCase().includes(searchTerm.toLowerCase());
      case "descripcion":
        return publications.description.toLowerCase().includes(searchTerm.toLowerCase());
      case "Tags":
        return publications.Tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      default:
        return publications.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="Search">
        <Navbar showIcons={true} />
        <Back/>
      <h1>Busqueda</h1>
      <input
        type="search"
        placeholder="¿Que desea buscar?"
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <select onChange={handleFilterTypeChange}>
        <option value="fecha">Fecha</option>
        <option value="descripcion">Descripción</option>
        <option value="Tags">Tags</option>
      </select>
      <button type="submit">Buscar</button>

      <ul>
        {filteredCategories.map((category) => (
          <li key={category.name}>
            <Category category={category} subcategories={category.subcategories} setVisibleSubcategories={setVisibleSubcategories} />
          </li>
        ))}
        <div className="Publications">
        {filteredPublications.map((publication) => (
          <li key={publication.name}>
            <Publication publication={publication} />
          </li>
        ))}
        </div>
      </ul>
      </div>
    
  );
}



// Define categories
const categories = [
  {
    name: "Labios",
    subcategories: [
      { name: "Brillos", description: "Brillos para labios",Tags: ["#brillo", "#labios"]},
      { name: "Labiales" }
    ]
  },
  {
    name: "Skincare",
    subcategories: [
      { name: "Día" },
      { name: "Noche" }
    ]
  }
];

// Define publications
const publications = [
  {
    name: "Maquillaje Malefica", createdAt: "2021-01-01", description: "Sorprende a tus amigos con villanos de Disney",Tags: ["#malefica", "#Disney"]
      
  },
  {
    
    name: "Maquillaje Bruja", createdAt: "2021-01-21", description: "haz magia",Tags: ["#bruja", "#magia"]
      
  },

  {
    name: "Maquillaje Ursula", createdAt: "2021-01-21", description: "Sorprende a tus amigos con villanos de Disney",Tags: ["#Disney", "#Ursula"]
      
  }

];

export default Search; 