import '../styles/Search.css'; 
import Navbar from "../components/Navbar" 
import back from "../components/assets/arrowBack.png";
import Brillo from "../components/assets/Gel brillo.png";
import LabialM from "../components/assets/labial mate.jpg";
import LabialP from "../components/assets/Labial morado.jpg";
import MBruja from "../components/assets/bruja.jpg";
import MMalefica from "../components/assets/malefica.jpg";
import MUrsula from "../components/assets/ursula.jpg";
import {Link} from 'react-router-dom';
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
    , category: "Disney", subcategory: "Villanos", image: MMalefica      
  },
  {
    
    name: "Maquillaje Bruja", createdAt: "23-01-2021", description: "haz magia",tags: ["#bruja", "#magia"]
    , category: "Halloween", subcategory: "Magic", image: MBruja
      
  },

  {
    name: "Maquillaje Ursula", createdAt: "23-01-2021", description: "Sorprende a tus amigos con villanos de Disney",tags: ["#Disney", "#Ursula"]
    , category: "Disney", subcategory: "Villanos", image: MUrsula
  }

];

const products = [
  {
     name: "Labial Ultra Mate", description: "El labial matecito" , price: 2000, available: 1, category: "Labios", subcategory: "Labiales", image: LabialM
       
  },
  {
     
     name: "Labial purple", description: "El labial mas morado" , price: 1500, available: 5 , category: "Labios", subcategory: "Labiales", image: LabialP
       
  },
 
  {
     name: 'Gel brillo', description: "El labial mas morado" , price: 3000, available: 5 , category: "Body", subcategory: "Glitter",  image: Brillo
  }
];

const SearchTableProducts = ({ filteredData}) => {
  if (filteredData.length === 0) {
    return null; // Don't render the table if there are no matching products.
  }
  return (
    <div className="Search">
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.name}>
            <div className="imageContentCart">
              <div className="cardImageCart">
                <td>
                  <Link to={`/ProductScreen/`}>
                    <img src={item.image} alt="" />
                  </Link>
                </td>
              </div>
            </div>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SearchTablePubli = ({ filteredData}) => {
  if (filteredData.length === 0) {
    return null; // Don't render the table if there are no matching products.
  }
  return (
    <div className="Search">
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tags</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.name}>
            <div className="imageContentCart">
              <div className="cardImageCart">
                <td>
                  <Link to={`/PublicationScreen/`}>
                    <img src={item.image} alt="" />
                  </Link>
                </td>
              </div>
            </div>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.tags}</td>
              <td>{item.createdAt || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SearchAll = ({ filteredData}) => {
  return (
    <div className="Search">
        <tbody>
        <div className="Category">
          {filteredData.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
            </tr>
          ))}
              </div>
        </tbody>
    </div>
  );
};

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


        {!selectedCategory && !selectedSubcategory && !searchText && (
          <SearchAll
          filteredData={[...filteredPublications , ...filteredProducts]}
        />
        )}


        {selectedCategory || selectedSubcategory || searchText ? (
          <SearchTableProducts
            filteredData={[ ...filteredProducts]}
          />
        ) : null}

        {selectedCategory || selectedSubcategory || searchText ? (
          <SearchTablePubli
            filteredData={[...filteredPublications]}
          />
        ) : null}

      </div>
    </div>
  );
}

export default Search;