import { Service } from "./Service";

export class Product extends Service{
    static id = 0
    private price: number;
    private available: number;

    //Constructor
    constructor(pName: string, pDescripcion: string, pPrice: number, pAvailable: number, pImage: Blob){
        super(Product.id++, pImage, pDescripcion, pName);
        this.price = pPrice;
        this.available = pAvailable;
    }

    public getAvailable(): number{
        return this.available;
    }

    public getPrice(): number{
        return this.price;
    }

}