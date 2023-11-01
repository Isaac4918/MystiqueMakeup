import {Category} from "./Category";

export class SubCategory{
    private name: string;
    private category: Category;

    //Contructor
    constructor(name: string){
        this.name = name;
        this.category = new Category("", []);
    }

    //Getters and setters
    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getCategory(): Category{
        return this.category;
    }

    public setCategory(category: Category): void{
        this.category = category;
    }

}