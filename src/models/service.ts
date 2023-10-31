export abstract class Service{
    private id: number;
    private image: Blob;
    private descripcion: String;
    private name: String;

    //Constructor
    constructor(pId: number, pImage: Blob, pDescripcion: String, pName: String){
        this.id = pId;
        this.image = pImage;
        this.descripcion = pDescripcion;
        this.name = pName;
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