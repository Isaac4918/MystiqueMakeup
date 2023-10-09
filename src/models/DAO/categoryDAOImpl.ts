import { collection, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from './databaseConfig';
import { crudDAO } from "./crudDAO";
import { Category } from "../category";

export class categoryDAOImpl implements crudDAO{
    private static instance: categoryDAOImpl;

    //Constructor
    private constructor(){
        //Default
    }

    //Getter
    public static getInstanceCategory(): categoryDAOImpl {
        if (!categoryDAOImpl.instance) {
            categoryDAOImpl.instance = new categoryDAOImpl();
        }
        return categoryDAOImpl.instance;
    }

    //Methods
    //--------------------------- CREATE ---------------------------------------------------------
    async create(pObj: Category): Promise<void> {
        let name = pObj.getName();
        try {
            await setDoc(doc(db, "Categories", name), {
                name: pObj.getName(),
                subCategory: pObj.getSubcategory()
            });
            console.log("Agregó con éxito");
        } catch (error) {
            console.error("Error al escribir: ", error);
        }
    }

    //--------------------------- GET ALL ---------------------------------------------------------
    async getAll(): Promise<Category[]> {
        try {
            const querySnapshot = await getDocs(collection(db, 'Categories'));
            let data: Category[] = [];
  
            querySnapshot.forEach((doc) => {
              // Add objects
              let categoryData = doc.data();
              let category = new Category(categoryData.subCategory, categoryData.name);
              data.push(category);
            });
  
            //Return object array
            return data;
  
          } catch (error) {
            throw new Error('Por el momento, no existen categorías');
          }
    }

     //--------------------------- GET ONE CATEGORY ---------------------------------------------------------
    async get(pId: string): Promise<Category> {
        try {
            const docSnapshot = await getDoc(doc(db, 'Categories', pId));
          
            if (docSnapshot.exists()) {
              // Get data
              let categoryData = docSnapshot.data();
              let category = new Category(categoryData.subCategory, categoryData.name);

              // Return object
              return category;
            } else {
                throw new Error('No existe la categoría');
            }

        } catch (error) {
            throw new Error('Error al obtener la cateogoría: '+ error);
        }   
    }

    //--------------------------- UPDATE ---------------------------------------------------------
    async update(pObj: Category): Promise<void> {
        let name = pObj.getName();
        try {
            const docRef = doc(db, 'Categories', name);
            await updateDoc(docRef, {
                name : pObj.getName(),
                subCategory: pObj.getSubcategory()
            });
            console.log("Categoría actualizada con éxito");
        } catch (error) {
            console.error("Error al actualizar la categoría: ", error);
        }
    }
    
    //--------------------------- DELETE ---------------------------------------------------------
    async delete(pObj: Category): Promise<void> {
        let name = pObj.getName();
        try {
            const docRef = doc(db, 'Categories', name);
            await deleteDoc(docRef);
            console.log("Categorís eliminada con éxito");
            
        } catch (error) {
            console.error("Error al eliminar la categoría: ", error);
        }
    }
}