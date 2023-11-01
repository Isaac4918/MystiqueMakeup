import { ItemFactory } from "./ItemFactory";
import { Publication } from "./Publication";

class PublicationFactory implements ItemFactory{
    createItem(pDescripcion: string, pName: string, pImage: Blob, pDate: string, pKeyWords: string[]): Object {
        return new Publication(pImage, pDescripcion, pName, pDate, pKeyWords);
    }
}


