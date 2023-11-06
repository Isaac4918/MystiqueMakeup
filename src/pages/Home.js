import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar" 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function OpenSeeProduct(pId){
  return(
      <div> 
          <a href={"/ProductScreen/" + pId.pId}><button className="buttonSeeHome">Ver Producto</button></a>
      </div>
  )
}

export function OpenSeePublication(pId){
    return(
        <div> 
            <a href={"/PublicationScreen/" + pId.pId}><button className="buttonSeeHome">Ver Publicación</button></a>
        </div>
    )
}

function Home(){
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const [products, setProducts] = useState([]);
    const [publications, setPublications] = useState([]);
    const baseAPIurl = 'http://localhost:5000';

    const getProducts = async () => {
        const response = await fetch(baseAPIurl + '/products/get/all', {
            method: 'GET',
        }).then(res => res.json());
        setProducts(response);
    }

    const getPublications = async () => {
        const response = await fetch(baseAPIurl + '/publications/get/all', {
            method: 'GET',
        }).then(res => res.json());
        setPublications(response);
    }

    useEffect(() => {
        getPublications();
    }, []);

    useEffect(() => {
        getProducts();
    }, []);


  return (
    <div className="Home">
          <Navbar showIcons={true} />
          <div className="pageHome">
              <h1>Nuevos Productos</h1>
              <div className="containerHome">
                  <Carousel responsive={responsive}>
                    {products.map((product) => (
                      <div className="cardHome" key={product.id}>
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={product.imageURL} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">{product.name}</div>
                                  <div className="descriptionHome">{product.description}</div>
                                  <OpenSeeProduct pId = {product.id}/>
                              </div>
                          </div>
                      </div>
                    ))}
                  </Carousel>

                  <hr className="divider" />

                <h1>Nuevos Maquillajes</h1>
                  <Carousel responsive={responsive}>
                    {publications.map((publication) => (
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={publication.imageURL} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">{publication.name}</div>
                                  <div className="descriptionHome">{publication.description}</div>
                                  <OpenSeePublication pId = {publication.id}/>
                              </div>
                          </div>
                      </div>
                    ))}
                  </Carousel>
              </div>
          </div>
      </div>
  );
}

export default Home;