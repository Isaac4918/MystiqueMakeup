import { SubCategory } from "./SubCategory";

export class Category{
  private name: string;
  private subcategory: SubCategory[];
  
  //Constructor
  constructor(idSubcategory: SubCategory[], name: string){
    this.subcategory = idSubcategory;
    this.name = name;
  }
  

  //Getters and setters
  public getName(): string{
    return this.name;
  }

  public setName(name: string): void{
    this.name = name;
  }

  public getSubcategory(): SubCategory[]{
    return this.subcategory;
  }

  public setSubcategory(subcategory: SubCategory[]): void{
    this.subcategory = subcategory;
  }

}