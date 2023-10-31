import { itemFactory } from "./itemFactory";
import { Product } from "./product";

export class ProductFactory implements itemFactory{
    createItem(pName: string, pDescripcion: string, pPrice: number, pAvailable: number, pImage: Blob): Object {
        return new Product(pName, pDescripcion, pPrice, pAvailable, pImage);
    }
}
