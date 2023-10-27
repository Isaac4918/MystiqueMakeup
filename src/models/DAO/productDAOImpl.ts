import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './configurationDB/databaseConfig';
import { crudDAO } from './crudDAO';
import { Product } from '../product';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export class productDAOImpl implements crudDAO{
    private static instance: productDAOImpl;

    //Constructor
    private constructor(){
        //Default
    }

    //Getter
    public static getInstanceProduct(): productDAOImpl {
        if (!productDAOImpl.instance) {
            productDAOImpl.instance = new productDAOImpl();
        }
        return productDAOImpl.instance;
    }

    //Methods

    //--------------------------- CREATE ---------------------------------------------------------
    async create(pObj: Product): Promise<void> {
        try{ 
            let id = pObj.getId;
            let urlImage = await this.uploadImage(pObj.getImage(), 'Product/${id}');  // Upload image to Firebase Storage y get URL

            await setDoc(doc(db, "Publications", id.toString()), {
                id: pObj.getId, 
                image: pObj.getImage,
                imagePath: urlImage,
                name: pObj.getName,
                date: pObj.getDate,
                keyWords: pObj.getKeyWords
            });
            console.log("Agregó con éxito");
        }catch(error){
            console.error("Error al escribir: ", error);
        }
    }

    
    async  uploadImage(pImagen: Blob, pPath: string): Promise<string> {
        const storage = getStorage();         //Get a reference to the Firebase storage service
        const imagenRef = ref(storage, pPath);  //Create a reference to the location where you want to save the image
        await uploadBytes(imagenRef, pImagen);  //Upload the image to Firebase Storage
        const url = await getDownloadURL(imagenRef); //Get image download URL
        return url;
    }


    //--------------------------- GET ALL ---------------------------------------------------------
    async getAll(): Promise<Product[]> {
        try {
            const querySnapshot = await getDocs(collection(db, 'Publications'));
            let data: Product[] = [];
  
            querySnapshot.forEach((doc) => {
              // Add objects
              data.push({id: doc.id, ...doc.data()} as unknown as Product);
            });
  
            //Return object array
            return data;
  
          } catch (error) {
            throw new Error('Por el momento, no existen publicaciones');
          }
    }

    //--------------------------- GET ONE Product---------------------------------------------------------
    async get(pObj: Product): Promise<Product> {
        let idPublication = pObj.getId().toString();
        try {
            const docSnapshot = await getDoc(doc(db, 'Publications', idPublication));
          
            if (docSnapshot.exists()) {
              // Get data
              let data = {id: docSnapshot.id, ...docSnapshot.data()} as unknown as Product;
          
              // Return object
              return data;
            } else {
                throw new Error('No existe el documento');
            }

        } catch (error) {
            throw new Error('Error al obtener el documento');
        }   
    }

    //--------------------------- UPDATE ---------------------------------------------------------
    async update(obj: Product): Promise<void> {
        //falta code
    }


    //--------------------------- DELETE ---------------------------------------------------------
    async delete(obj: Product): Promise<void> {
        //falta code
    }

}
