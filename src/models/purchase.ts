export class Purchase{
    private orderNumber: number;
    private finalPrice: number;
    private address: string;
    private receiptImageName: string;
    private pending: boolean;
    
    //Constructor
    constructor(){

    }

    //Getters and setters 
    public getOrderNumber(): number{
        return this.orderNumber;
    }

    public setOrderNumber(orderNumber: number): void{
        this.orderNumber = orderNumber;
    }

    public getFinalPrice(): number{
        return this.finalPrice;
    }

    public setFinalPrice(finalPrice: number): void{
        this.finalPrice = finalPrice;
    }

    public getAddress(): string{
        return this.address;
    }

    public setAddress(address: string): void{
        this.address = address;
    }

    public getPending(): boolean{
        return this.pending;
    }

    public setPending(pending: boolean): void{
        this.pending = pending;
    }


}