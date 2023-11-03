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

// Define categories
const categories = [
  {
    name: "Labios",
    subcategories: [
      { name: "Brillos"},
      { name: "Labiales" }
    ]
  },
  {
    name: "Skincare",
    subcategories: [
      { name: "Día" },
      { name: "Noche" }
    ]
  },

  {
    name: "Disney",
    subcategories: [
      { name: "Villanos" },
      { name: "Heroes" }
    ]
  }
];

// Define publications
const publications = [
  {
    name: "Maquillaje Malefica", createdAt: "01-01-2021", description: "Sorprende a tus amigos con villanos de Disney",tags: ["#malefica", "#Disney"]
    , category: "Disney", subcategory: "Villanos"      
  },
  {
    
    name: "Maquillaje Bruja", createdAt: "23-01-2021", description: "haz magia",tags: ["#bruja", "#magia"]
    , category: "Halloween", subcategory: "Magic"
      
  },

  {
    name: "Maquillaje Ursula", createdAt: "23-01-2021", description: "Sorprende a tus amigos con villanos de Disney",tags: ["#Disney", "#Ursula"]
    , category: "Disney", subcategory: "Villanos"
  }

];

const products = [
  {
     name: "Labial Ultra Mate", description: "El labial matecito" , price: 2000, available: 1, category: "Labios", subcategory: "Labiales"
       
  },
  {
     
     name: "Labial purple", description: "El labial mas morado" , price: 1500, available: 5 , category: "Labios", subcategory: "Labiales"
       
  },
 
  {
     name: 'Gel brillo', description: "El labial mas morado" , price: 3000, available: 5 , category: "Body", subcategory: "Glitter"
  }
];


function Search() {
 const [searchText, setSearchText] = useState('');
 const [selectedCategory, setSelectedCategory] = useState('');
 const [selectedSubcategory, setSelectedSubcategory] = useState('');

 const handleSearch = (event) => {
    setSearchText(event.target.value);
 };

 const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory('');
 };

 const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
 };

 const filteredPublications = publications.filter(
    (publication) => {
      if (selectedCategory && selectedCategory !== publication.category) {
        return false;
      }
      if (selectedSubcategory && selectedSubcategory !== publication.subcategory) {
        return false;
      }
      return publication.name.toLowerCase().includes(searchText.toLowerCase()) ||
             publication.createdAt.toLowerCase().includes(searchText.toLowerCase()) ||
             publication.description.toLowerCase().includes(searchText.toLowerCase()) ||
             publication.tags.join(' ').toLowerCase().includes(searchText.toLowerCase()) ||
             publication.category.toLowerCase().includes(searchText.toLowerCase()) ||
             publication.subcategory.toLowerCase().includes(searchText.toLowerCase());
    }
  );

  const filteredProducts = products.filter(
    (product) => {
      if (selectedCategory && selectedCategory !== product.category) {
        return false;
      }
      if (selectedSubcategory && selectedSubcategory !== product.subcategory) {
        return false;
      }
      return  product.name.toLowerCase().includes(searchText.toLowerCase()) ||
              product.description.toLowerCase().includes(searchText.toLowerCase()) ||
              product.category.toLowerCase().includes(searchText.toLowerCase()) ||
              product.subcategory.toLowerCase().includes(searchText.toLowerCase());
    }
  );

  return (
    <div>
          <div className="Search">
        <Navbar showIcons={true} />
        <Back/>
      <h1>Busqueda</h1>
      <input type="text" placeholder="Buscar..." value={searchText} onChange={handleSearch} />
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>{category.name}</option>
        ))}
      </select>
      <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
        <option value="">Todas las subcategorías</option>
        {categories.find((category) => category.name === selectedCategory)?.subcategories.map((subcategory) => (
          <option key={subcategory.name} value={subcategory.name}>{subcategory.name}</option>
        ))}
      </select>
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {filteredPublications.map((publication) => (
          <li key={publication.name}>{publication.name}</li>
        ))}
      </ul>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.name}>{product.name}</li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Search;