export class subCategory{
    private name: string;

    //Contructor
    constructor(name: string){
        this.name = name;
    }

    //Getters and setters
    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

}