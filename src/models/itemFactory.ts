interface itemFactory{
    createItem(...args: any[]): Object;
}

export interface publicationFactory extends itemFactory{
    createItem(pDescripcion: String, pName: String, pImage: Blob, pDate: String, pKeyWords: String[]): Object;
}

interface productFactory extends itemFactory{
    createItem(pDescripcion: String, pName: String, pImage: Blob, pPrice: number, pAvailability: number): Object;
}