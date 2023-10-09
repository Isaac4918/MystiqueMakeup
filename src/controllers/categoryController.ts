import { Category } from "../models/category";
import { subCategory } from "../models/subCategory";
import { categoryDAOImpl  } from "../models/DAO/categoryDAOImpl";

export class categoryController{
    private categoryDAO: categoryDAOImpl;
    private subCategoryList: subCategory[];

    //Constructor
    constructor(){
        this.categoryDAO = categoryDAOImpl.getInstanceCategory(); 
    }

    //Methods
    //--------------------------- CREATE ---------------------------------------------------------
    async createCategory(pCategory: string, pSubCategory: string[]): Promise<void>{
        if(this.validateRepeatedSubCategories(pSubCategory)){
            console.log("El nombre de las subcategorías debe ser único.")
        }else{
            if(this.validateEmpty(pCategory)){
                console.log("Debe ingresar el nombre de la categoría.")
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

    //----------------------------- VALIDATIONS ---------------------------------------------------------
    private validateEmpty(pName: string): boolean{ //if pName is empty, return true
        if(pName == ""){
            return true;
        }
        return false;
    }

    private async validateUniqueCategoryName(pName: string): Promise<boolean>{ //if pName is unique, return true
        for(let category of await this.categoryDAO.getAll()){
            if(category.getName() == pName){
                return false;
            }
        }
        return true;
    }

    private validateRepeatedSubCategories(pSubCategory: string[]): boolean { //returns true if repeated names are entered
        for (let i = 0; i < pSubCategory.length; i++) {
          if (pSubCategory.includes(pSubCategory[i], i + 1)) {
            return true;
          }
        }
        return false;
      }
}