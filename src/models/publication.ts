import { publicationFactory } from './itemFactory';
import { service } from './service';

export class Publication extends service implements publicationFactory{
    static id = 0
    private date: string;
    private keyWords: string[];
   
    constructor(pImage: Blob, pDescripcion: string, pName: string, pDate: string, pKeyWords: string[]){
        super(Publication.id++, pImage, pDescripcion, pName);
        this.date = pDate;
        this.keyWords = pKeyWords;
    }


    //Getters
    public getDate(): String{
        return this.date;
    }

    public getKeyWords(): String []{
        return this.keyWords;
    }

    //Method
    createItem(pDescripcion: string, pName: string, pImage: Blob, pDate: string, pKeyWords: string[]): Object {
        return new Publication(pImage, pDescripcion, pName, pDate, pKeyWords);
    }
}
