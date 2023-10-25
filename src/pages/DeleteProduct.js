import React from 'react';
import PropTypes from 'prop-types';
import Navbar from "../components/Navbar";
import {Link} from 'react-router-dom';
import back from "../components/assets/arrowBack.png";

function DeleteProduct(props) {
    return (
        <div>
            <Navbar showIcons={true} />
            <div className="centered">
                <div className="title">¿De verdad desea eliminar?</div>
                <Link to={"/"}>
                    <button className="buttonDeleteProduct">Confirmar</button>
                </Link>
            </div>
        </div>
    );
}

DeleteProduct.propTypes = {
    prop1: PropTypes.string.isRequired,
    prop2: PropTypes.number,
};

DeleteProduct.defaultProps = {
    prop2: 0,
};

export default DeleteProduct;
