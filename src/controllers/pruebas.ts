import { accountController } from "./accountController"; 

function prueba(): void{
    // Crear una instancia de accountController
    let controller = new accountController();
    
    // Datos para la nueva cuenta
    let username = "OtraPrueba2";
    let password = "unacontrasenna123";
    let email = "wuiiiihh@test.com";
    let admin = true;
    
    // Crear la nueva cuenta
    //controller.createAccount(username, password, email, admin);

    //Update
    //controller.updateAccount(username, password, email, admin);

    //Delete
    controller.deleteAccount(username);
}

prueba();

