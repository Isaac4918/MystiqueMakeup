import { Service } from './Service';

export class Publication extends Service{
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

}