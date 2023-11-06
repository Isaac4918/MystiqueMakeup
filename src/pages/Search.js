import '../styles/Search.css';
import Navbar from "../components/Navbar"
import back from "../components/assets/arrowBack.png";
import Brillo from "../components/assets/Gel brillo.png";
import LabialM from "../components/assets/labial mate.jpg";
import LabialP from "../components/assets/Labial morado.jpg";
import MBruja from "../components/assets/bruja.jpg";
import MMalefica from "../components/assets/malefica.jpg";
import MUrsula from "../components/assets/ursula.jpg";
import { Link } from 'react-router-dom';
import React, { useState } from "react";

export function Back() {
  return (
    <div className="backSearch">
      <a href="/"><img src={back} alt="" /></a>
    </div>
  )
}

const baseAPIurl = 'http://localhost:5000';

const categories = await fetch(baseAPIurl + '/category/all', {
  method: 'GET',
}).then(res => res.json());

const publications = await fetch(baseAPIurl + '/publications/get/all', {
  method: 'GET',
}).then(res => res.json());

const products = await fetch(baseAPIurl + '/products/get/all', {
  method: 'GET',
}).then(res => res.json());

const parseTags = (tags) => {
  let parsedTags = '';
  for (let i = 0; i < tags.length; i++) {
      parsedTags += '#' + tags[i] + ' ';
  }
  return parsedTags;
}

const SearchTableProducts = ({ filteredData }) => {
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
                    <Link to={`/ProductScreen/` + item.id}>
                      <img src={item.imageURL} alt="" />
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

const SearchTablePubli = ({ filteredData }) => {
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
                    <Link to={`/PublicationScreen/` + item.id}>
                      <img src={item.imageURL} alt="" />
                    </Link>
                  </td>
                </div>
              </div>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.tags}</td>
              <td>{item.date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SearchAll = ({ filteredData }) => {
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
      return publication.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.date?.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        parseTags(publication.tags)?.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.category?.toLowerCase().includes(searchText.toLowerCase()) ||
        publication.subCategory?.toLowerCase().includes(searchText.toLowerCase());
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
      return product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchText.toLowerCase()) ||
        product.subCategory?.toLowerCase().includes(searchText.toLowerCase());
    }
  );

  return (
    <div>
      <Navbar showIcons={true} />
      <div className="Search">
        <Back />
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
          {categories.find((category) => category.name === selectedCategory)?.subCategories.map((subcategory) => (
            <option key={subcategory.name} value={subcategory.name}>{subcategory.name}</option>
          ))}
        </select>

        <button onClick={handleSearch}>Buscar</button>


        {!selectedCategory && !selectedSubcategory && !searchText && (
          <SearchAll
            filteredData={[...filteredPublications, ...filteredProducts]}
          />
        )}


        {selectedCategory || selectedSubcategory || searchText ? (
          <SearchTableProducts
            filteredData={[...filteredProducts]}
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