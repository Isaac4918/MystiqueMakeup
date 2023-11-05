import { Category } from "../models/Category";
import { SubCategory } from "../models/SubCategory";
import { categoryDAOImpl  } from "../models/DAO/categoryDAOImpl";
import e from "express";

export class CategoryController{
    private static instance: CategoryController;
    private categoryDAO: categoryDAOImpl;
    private categoryList: Category[] = [];

    //Constructor
    constructor(){
        this.categoryDAO = categoryDAOImpl.getInstanceCategory();
        this.initializeCategoryList();
    }

    async initializeCategoryList() {
        this.categoryList = await this.getAllCategories();
    }

    //Getter
    public static getInstance(): CategoryController {
        if (!CategoryController.instance) {
            CategoryController.instance = new CategoryController();
        }
        return CategoryController.instance;
    }

    //Methods

    // addCategory to categoryList
    public addCategory(pCategory: Category): void{
        this.categoryList.push(pCategory);
    }

    //getCategoyList
    public getCategoryList(): Category[]{
        return this.categoryList;
    }

    //--------------------------- CREATE ---------------------------------------------------------
    async createCategory(pCategory: string, pSubCategory: string[]): Promise<boolean>{
        if(this.validateEmpty(pCategory)){
            console.log("Debe ingresar el nombre de la categoría.")
            return false;
        }else{
            let repeatedSubCategories = await this.validateRepeatedSubCategories(pSubCategory);
            if(repeatedSubCategories){
                console.log("El nombre de las subcategorías debe ser único.")
                return false;
            }else{
                let uniqueCategoryName = await this.validateUniqueCategoryName(pCategory)
            
                if(uniqueCategoryName){
                    let subCategoryList: SubCategory[] = [];	
                    for(let name of pSubCategory){
                        if(!this.validateEmpty(name)){
                            subCategoryList.push(new SubCategory(name));
                        }  
                    }
    
                    let category = new Category(pCategory, subCategoryList);
                    this.categoryDAO.create(category);
                    this.addCategory(category);
                    return true;
                }else{
                    console.log("Ese nombre ya existe. Ingrese otro nombre de categoría.")
                    return false;
                }  
            }
        }
    }

    //--------------------------- READ ---------------------------------------------------------
    async getAllCategories(): Promise<Category[]>{
        return await this.categoryDAO.getAll();
    }

    //--------------------------- UPDATE ---------------------------------------------------------
    async updateCategory(pCategory: string, pSubCategory: string[]): Promise<boolean>{
        if(this.validateEmpty(pCategory)){
            console.log("Debe ingresar el nombre de la categoría.")
            return false;
        }else{
            let repeatedSubCategories = await this.validateRepeatedSubCategories(pSubCategory);
            if(repeatedSubCategories){
                console.log("El nombre de las subcategorías debe ser único.")
                return false;
            }else{
                let uniqueCategoryName = await this.validateUniqueCategoryName(pCategory)
            
                if(uniqueCategoryName){
                    let subCategoryList: SubCategory[] = [];	
                    for(let name of pSubCategory){
                        if(!this.validateEmpty(name)){
                            subCategoryList.push(new SubCategory(name));
                        }  
                    }
    
                    let category = new Category(pCategory, subCategoryList);
                    this.categoryDAO.update(category);
                    return true;
                }else{
                    console.log("Ese nombre ya existe. Ingrese otro nombre de categoría.")
                    return false;
                }  
            }
        }
    }

    //--------------------------- DELETE ---------------------------------------------------------
    async deleteCategory(pCategory: string): Promise<void>{
        let category = await this.categoryDAO.get(pCategory);
        this.categoryDAO.delete(category);

        let index = this.categoryList.indexOf(category);
        this.categoryList.splice(index, 1);

    }

    //----------------------------- VALIDATIONS ---------------------------------------------------------
    private validateEmpty(pName: string): boolean{ //if pName is empty, return true
        if(pName == ""){
            return true;
        }
        return false;
    }

    private async validateUniqueCategoryName(pName: string): Promise<boolean>{ //if pName is unique, return true
        for(let category of await this.categoryDAO.getAll()){
            console.log(category.getName());
            console.log(category.getSubcategory());

            if(category.getName() == pName){
                return false;
            }
        }
        return true;
    }

    private async validateRepeatedSubCategories(pSubCategory: string[]): Promise<boolean> { //returns true if repeated names are entered
        // returns true if there are repeated names in the list pSubCategory
        let repeatedSubCategories = false;
        let subCategoryList: string[] = [];

        for(let name of pSubCategory){
            if(this.validateEmpty(name) == false){
                if(subCategoryList.includes(name)){
                    repeatedSubCategories = true;
                }else{
                    subCategoryList.push(name);
                }
            }  
        }
        return repeatedSubCategories;
    }
}