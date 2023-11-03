import React from 'react';
import Navbar from "../../components/Navbar";
import {Link} from 'react-router-dom';
import back from "../../components/assets/arrowBack.png";

function DeletePublication() {
  return (
    <div>
      <Navbar showIcons={true} />
      <Link to={"/PublicationManagement"}><button className="backManagementPublication"><img src={back} alt=""/></button></Link>
      <div className="centered">
        <div className="title">¿De verdad desea eliminar?</div>
        <Link to={"/PublicationManagement"}>
          <button className="buttonDeletePublications">Confirmar</button>
        </Link>
      </div>
    </div>
  );
}

export default DeletePublication;
