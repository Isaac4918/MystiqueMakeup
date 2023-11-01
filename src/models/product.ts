import { Service } from "./Service";
import { SubCategory } from "./SubCategory";

export class Product extends Service{
    static id = 0
    private price: number;
    private available: number;

    //Constructor
    constructor(pName: string, pDescripcion: string, pPrice: number, pAvailable: number, pImage: Blob, pSubCategory: SubCategory){
        super(Product.id++, pImage, pDescripcion, pName, pSubCategory);
        this.price = pPrice;
        this.available = pAvailable;
    }

    public getAvailable(): number{
        return this.available;
    }

    public getPrice(): number{
        return this.price;
    }

    public setAvailable(available: number): void{
        this.available = available;
    }

    public setPrice(price: number): void{
        this.price = price;
    }

}