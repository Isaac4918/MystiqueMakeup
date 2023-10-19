import { subCategory } from "./subCategory";

export class Category{
  private name: string;
  private subcategory: subCategory[];
  
  //Constructor
  constructor(idSubcategory: subCategory[], name: string){
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

  public getSubcategory(): subCategory[]{
    return this.subcategory;
  }

  public setSubcategory(subcategory: subCategory[]): void{
    this.subcategory = subcategory;
  }

}