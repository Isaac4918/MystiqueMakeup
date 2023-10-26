// Publication Controller
import { Publication } from "../models/publication";
import {  publicationDAOImpl  } from "../models/DAO/publicationDAOImpl";

class publicationsController{
    private publicationDAO: publicationDAOImpl;
    
    //Constructor
    constructor(){
        this.publicationDAO = publicationDAOImpl.getInstancePublication();
    }

    createPublication(pDescripcion: String, pName: String, pImageName: String, pDate: String, pKeyWords: String[]): void{
        
    }

}