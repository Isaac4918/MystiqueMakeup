import { subCategory } from "../models/subCategory";
import { categoryController } from "./categoryController";

function prueba(): void{
    // Crear una instancia de accountController
    let controller = new categoryController();
    
    /*
    let category = "Categoria1";
    let listSubcategory: string[];
    listSubcategory = [];
    listSubcategory.push("Subcategoria1", "Subcategoria2");
    
    // Crear la nueva cuenta
    controller.createCategory(category, listSubcategory);*/

    
    let category2 = "Categoria2";
    let listSubcategory2: string[];
    listSubcategory2 = [];
    listSubcategory2.push("Subcategoria3", "Subcategoria4");

    controller.createCategory(category2, listSubcategory2);

    //Update
    //controller.updateAccount(username, password, email, admin);

    //Delete
    //controller
}

prueba();

