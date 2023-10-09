class category{
  private name: string;
  private idSubcategory: subCategory;
  
  //Constructors
  constructor(name: string);
  constructor(idSubcategory: subCategory, name: string);
  
  // Implementation
  constructor(idSubcategoryOrName: subCategory | string, name?: string) {
    if (idSubcategoryOrName instanceof subCategory) {
      this.idSubcategory = idSubcategoryOrName;
      this.name = name || '';
    } else {
      this.name = idSubcategoryOrName;
    }
  }

  //Getters and setters
  public getName(): string{
    return this.name;
  }

  public setName(name: string): void{
    this.name = name;
  }

  public getIdSubcategory(): subCategory{
    return this.idSubcategory;
  }

  public setIdSubcategory(idSubcategory: subCategory): void{
    this.idSubcategory = idSubcategory;
  }

}