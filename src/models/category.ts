import { SubCategory } from "./SubCategory";

export class Category{
  private name: string;
  private subcategory: SubCategory[];
  
  //Constructor
  constructor(name: string, pSubcategory: SubCategory[]){
    this.subcategory = pSubcategory;
    this.name = name;
    for(let i = 0; i < this.subcategory.length; i++){
      this.subcategory[i].setCategory(this);
    }
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
    for(let i = 0; i < this.subcategory.length; i++){
      this.subcategory[i].setCategory(this);
    }
  }
}