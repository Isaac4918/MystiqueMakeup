import { itemFactory } from "./itemFactory";
import { Publication } from "./publication";

class PublicationFactory implements itemFactory{
    createItem(pDescripcion: string, pName: string, pImage: Blob, pDate: string, pKeyWords: string[]): Object {
        return new Publication(pImage, pDescripcion, pName, pDate, pKeyWords);
    }
}


