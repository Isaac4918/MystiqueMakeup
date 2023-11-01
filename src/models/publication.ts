import { Service } from './Service';
import { SubCategory } from "./SubCategory";

export class Publication extends Service{
    static id = 0
    private date: string;
    private keyWords: string[];
   
    constructor(pName: string, pDescripcion: string, pImage: Blob, pDate: string, pKeyWords: string[], pSubCategory: SubCategory){
        super(Publication.id++, pImage, pDescripcion, pName, pSubCategory);
        this.date = pDate;
        this.keyWords = pKeyWords;
    }

    public getDate(): String{
        return this.date;
    }

    public getKeyWords(): String []{
        return this.keyWords;
    }

    public setDate(date: string): void{
        this.date = date;
    }

    public setKeyWords(keyWords: string[]): void{
        this.keyWords = keyWords;
    }

}