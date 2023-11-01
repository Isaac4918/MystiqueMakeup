import { SubCategory } from "./SubCategory";

export class Category{
  private name: string;
  private subcategory: SubCategory[];
  
  //Constructor
  constructor(name: string){
    this.subcategory = [];
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

  public addSubcategory(pSubcategory: SubCategory): void{
    this.subcategory.push(pSubcategory);
    pSubcategory.setCategory(this);
  }
}