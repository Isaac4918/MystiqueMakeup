
export interface crudDAO{
    getAll(): Promise<Object[]>;
    get(pId:string): Promise<Object>;
    create(pObj:Object): Promise<void>;
    update(pObj:Object): Promise<void>;
    delete(pObj:Object): Promise<void>;
}
