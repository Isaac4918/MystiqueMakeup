import { ItemFactory } from "./ItemFactory";
import { Product } from "./Product";

export class ProductFactory implements ItemFactory{
    createItem(pName: string, pDescripcion: string, pPrice: number, pAvailable: number, pImage: Blob): Object {
        return new Product(pName, pDescripcion, pPrice, pAvailable, pImage);
    }
}
