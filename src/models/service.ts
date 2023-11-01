import { SubCategory } from "./SubCategory";

export abstract class Service{
    private id: number;
    private image: Blob;
    private descripcion: String;
    private name: String;
    private subCategory: SubCategory;


    //Constructor
    constructor(pId: number, pImage: Blob, pDescripcion: String, pName: String, subCategory: SubCategory){
        this.id = pId;
        this.image = pImage;
        this.descripcion = pDescripcion;
        this.name = pName;
        this.subCategory = subCategory;
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

    public getSubCategory(): SubCategory{
        return this.subCategory;
    }

    //Setters
    public setId(id: number): void{
        this.id = id;
    }

    public setImage(image: Blob): void{
        this.image = image;
    }

    public setDescription(description: String): void{
        this.descripcion = description;
    }

    public setName(name: String): void{
        this.name = name;
    }

    public setSubCategory(subCategory: SubCategory): void{
        this.subCategory = subCategory;
    }

}