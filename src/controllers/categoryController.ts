import { Category } from "../models/category";
import { subCategory } from "../models/subCategory";
import { categoryDAOImpl  } from "../models/DAO/categoryDAOImpl";

export class categoryController{
    private categoryDAO: categoryDAOImpl;
    private subCategoryList: subCategory[];

    //Constructor
    constructor(){
        this.categoryDAO = categoryDAOImpl.getInstanceCategory();
        this.subCategoryList = []; 
    }

    //Methods
    //--------------------------- CREATE ---------------------------------------------------------
    async createCategory(pCategory: string, pSubCategory: string[]): Promise<void>{
        if(this.validateEmpty(pCategory)){
            console.log("Debe ingresar el nombre de la categoría.")
        }else{
            let repeatedSubCategories = await this.validateRepeatedSubCategories(pSubCategory);
            if(repeatedSubCategories == true){
                console.log("El nombre de las subcategorías debe ser único.")
            }else{
                let uniqueCategoryName = await this.validateUniqueCategoryName(pCategory)
            
                if(uniqueCategoryName == true){
                    for(let name of pSubCategory){
                        if(this.validateEmpty(name) == false){
                            this.subCategoryList.push(new subCategory(name));
                        }  
                    }
    
                    let category = new Category(this.subCategoryList, pCategory);
                    this.categoryDAO.create(category);
                }else{
                    console.log("Ese nombre ya existe. Ingrese otro nombre de categoría.")
                }  
            }
        }      
    }

    //--------------------------- READ ---------------------------------------------------------
    async getAllCategories(): Promise<Category[]>{
        return await this.categoryDAO.getAll();
    }

    //--------------------------- UPDATE ---------------------------------------------------------
    async updateCategory(pCategory: string, pSubCategory: string[]): Promise<void>{
        for(let name of pSubCategory){
            if(this.validateEmpty(name) == false){
                this.subCategoryList.push(new subCategory(name));
            }  
        }

        let category = new Category(this.subCategoryList, pCategory);
        this.categoryDAO.update(category);
    }

    //--------------------------- DELETE ---------------------------------------------------------
    async deleteCategory(pCategory: string, pSubCategory: string[]): Promise<void>{
        for(let name of pSubCategory){
            if(this.validateEmpty(name) == false){
                this.subCategoryList.push(new subCategory(name));
            }  
        }

        let category = new Category(this.subCategoryList, pCategory);
        this.categoryDAO.delete(category);
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
        for(let category of await this.categoryDAO.getAll()){
            for (let subcategory of category.getSubcategory()) {
                console.log(subcategory);
                /*
                if (pSubCategory.includes(element.getName())) {
                    return true;
                }*/
            }
        }
        return false;
      }
}