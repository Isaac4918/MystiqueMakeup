import { Product } from "../models/Product";
import {  productDAOImpl  } from "../models/DAO/productDAOImpl";
import { ProductFactory } from "../models/productFactory";

class productsController{
    private static instance: productsController;
    private productDAO: productDAOImpl;
    
    //Constructor
    constructor(){
        this.productDAO = productDAOImpl.getInstanceProduct();
    }

    //Getter
    public static getInstanceAccountController(): productsController {
        if (!productsController.instance) {
            productsController.instance = new productsController();
        }
        return productsController.instance;
    }

    //Methods
    //---------------------------------------------------- REGISTER ---------------------------------------------------------
    
    //--------------------------- CREATE ---------------------------------------------------------
    async createProduct(name: string, descripcion: string, price: number, available: number, pImage: Blob){
        let productFactory = new ProductFactory();
        let product = productFactory.createItem(name, descripcion, price, available, pImage);
        this.productDAO.create(product);
    }

}