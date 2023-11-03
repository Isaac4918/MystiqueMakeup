import React from "react";
import "../styles/Home.css";
import Navbar from "../components/Navbar" 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


import labiales from "../components/assets/labiales.jpg";
import delineador from "../components/assets/delineador.jpg";
import polvos from "../components/assets/polvos.jpg";
import MBruja from "../components/assets/bruja.jpg";
import MMalefica from "../components/assets/malefica.jpg";
import MUrsula from "../components/assets/ursula.jpg";

export function OpenSeeProduct(){
  return(
      <div> 
          <a href="/ProductScreen"><button className="buttonSeeHome">Ver Producto</button></a>
      </div>
  )
}

export function OpenSeePublication(){
    return(
        <div> 
            <a href="/PublicationScreen"><button className="buttonSeeHome">Ver Publicacion</button></a>
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


  return (
    <div className="Home">
          <Navbar showIcons={true} />
          <div className="pageHome">
              <h1>Nuevos Productos</h1>
              <div className="containerHome">
                  <Carousel responsive={responsive}>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={polvos} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Polvito mágico</div>
                                  <div className="descriptionHome">Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd cuanto ser el limite que ocupe esta cosa sea</div>
                                  <OpenSeeProduct />
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={labiales} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Labial colorcito</div>
                                  <div className="descriptionHome">Decora tus labios con estos nuevos labiales</div>
                                  <OpenSeeProduct/>
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={delineador} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Delineador maravilla</div>
                                  <div className="descriptionHome">Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd</div>
                                  <OpenSeeProduct />
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={delineador} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Delineador maravilla</div>
                                  <div className="descriptionHome">Cubre los poros y no afecta la piel, muy barato y dispensable para la vida xd</div>
                                  <OpenSeeProduct />
                              </div>
                          </div>
                      </div>
                  </Carousel>

                  <hr className="divider" />

                <h1>Nuevos Maquillajes</h1>
                  <Carousel responsive={responsive}>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={MMalefica} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Maquillaje Malefica</div>
                                  <div className="descriptionHome">Sorprende a tus amigos con villanos de Disney</div>
                                  <OpenSeePublication />
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={MBruja} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Maquillaje Bruja</div>
                                  <div className="descriptionHome">Haz magia</div>
                                  <OpenSeePublication/>
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={MUrsula} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Maquillaje Ursula</div>
                                  <div className="descriptionHome">Sorprende a tus amigos con villanos de Disney</div>
                                  <OpenSeePublication />
                              </div>
                          </div>
                      </div>
                      <div className="cardHome">
                          <div className="contentHome">
                              <div className="imageContentHome">
                                  <div className="cardImageHome">
                                      <img src={MUrsula} alt=""/>
                                  </div>
                              </div>
                              <div className="cardContentHome">
                                  <div className="namesHome">Maquillaje Ursula</div>
                                  <div className="descriptionHome">Sorprende a tus amigos con villanos de Disney</div>
                                  <OpenSeePublication />
                              </div>
                          </div>
                      </div>
                  </Carousel>
              </div>
          </div>
      </div>
  );
}

export default Home;