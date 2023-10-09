import { Account } from "../models/account";
import {  accountDAOImpl  } from "../models/DAO/accountDAOImpl";

export class accountController{
    private accountDAO: accountDAOImpl;
    //private accountList: Account[];

    //Constructor
    constructor(){
        this.accountDAO = accountDAOImpl.getInstanceAccount();
        //this.accountList = [];  
    }

    //Methods
    //--------------------------- CREATE ---------------------------------------------------------
    async createAccount(username: string, password: string, email: string, admin: boolean): Promise<void>{
        if(this.validateEmpty(username, password, email, admin)){
            console.log("Debe llenar todos los campos");
        }else{
            let uniqueUsername = await this.validateUniqueUsername(username);
            if(uniqueUsername){
                if(this.validatePassword(password)){
                    if(this.validateEmail(email)){
                        let account = new Account(username, password, email, admin);
                        this.accountDAO.create(account);
                    }else{
                        console.log("Ingrese un correo válido");
                    }
                }else{
                    console.log("Ingrese una contraseña minimo de 8 digitos con al menos una letra, número y caracter especial");
                }
            }else{
                console.log("El nombre de usuario ya existe");
            }
        }
    }

    //--------------------------- UPDATE ---------------------------------------------------------
    async updateAccount(username: string, password: string, email: string, admin: boolean): Promise<void>{
        if(this.validateEmpty(username, password, email, admin)){
            console.log("Debe llenar todos los campos");
        }else{
            if(this.validatePassword(password)){
                if(this.validateEmail(email)){
                    let account = await this.accountDAO.get(username);

                    if(account.getPassword() != password){
                        account.setPassword(password);
                    }
        
                    if(account.getEmail() != email){
                        account.setEmail(email);
                    }
        
                    if(account.getAdmin() != admin){
                        account.setAdmin(admin);
                    }
                    
                    this.accountDAO.update(account);
                }else{
                    console.log("Ingrese un correo válido");
                }
            }else{
                console.log("Ingrese una contraseña minimo de 8 digitos con al menos una letra, número y caracter especial");
            }

        }
    }
    
    //--------------------------- DELETE ---------------------------------------------------------
    async deleteAccount(username: string): Promise<void>{
        if(username != ""){
            let uniqueUsername = await this.validateUniqueUsername(username);
            if(uniqueUsername == false){
                let account = await this.accountDAO.get(username);
                this.accountDAO.delete(account);
            }
        }else{
            console.log("Debe ingresar un nombre de usuario");
        }
    }

    //----------------------------- VALIDATIONS ---------------------------------------------------------
    private validateEmpty(username: string, password: string, email: string, admin: boolean): boolean{
        if(username == "" || password == "" || email == "" || admin == null){
            return true;
        }
        return false;
    }

    private async validateUniqueUsername(username: string): Promise<boolean>{
        for(let account of await this.accountDAO.getAll()){
            if(account.getUsername() == username){
                return false;
            }
        }
        return true;
    }

    private validatePassword(password: string): boolean{
        const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        if(password.length >= 8 && regex.test(password)){
            return true;
        }
        return false;
    }

    private validateEmail(email: string): boolean{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
}

