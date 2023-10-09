export abstract class service{
    private id: number;
    private image: Blob;
    private descripcion: String;
    private name: String;
    private idSubCategory: subCategory;

    //Constructors
    constructor(pId: number, pImage: Blob, pDescription: string, pName: string);
    constructor( pId: number, pImage: Blob, pDescripcion: string, pName: string, idSubcategory: subCategory);

    //Implementation
    constructor(pId: number, pImage: Blob, pDescription: string, pName: string, idSubcategory?: subCategory | null) {
        this.id = pId;
        if (idSubcategory instanceof subCategory) {
            this.idSubCategory = idSubcategory;
            this.image = pImage;
            this.descripcion = pDescription;
            this.name = pName;
        } else {
            this.image = pImage;
            this.descripcion = pDescription;
            this.name = pName
        }
    }


    //Getters
    public getId(): number{
        return this.id;
    }

    public getImage(): Blob{
        return this.image;
    }

    public getDescription(): String{
        return this.descripcion;
    }

    public getName(): String{
        return this.name;
    }

}