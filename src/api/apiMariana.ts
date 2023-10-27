import express from 'express';
import { accountController } from '../controllers/accountController';
import { admin } from "../models/DAO/configurationDB/databaseConfig"
import cors from 'cors';

// Create a new express app
const app = express();
// App configuration
app.disable('x-powered-by');
app.use(express.json());

// Define port number
const PORT = 5000;

// Define routes


app.use(cors({
    origin: 'http://localhost:3000',
  }));


// main route
app.get('/', (req, res) => {
    res.send('Welcome to the Mystique Makeup API!');
});

// new account
app.post('/createAccount', (req, res) => {
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    controller.createAccount(data.username, data.password, data.email, data.admin);
    const response = {'response': 'Account created successfully'}
    res.json(response);
});

// get account
app.get('/getAccount', async (req, res) =>{
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    const account = await controller.getAccount(data.username)
    res.send('GetAccount successfully');
});


// login
app.post('/loginAccount',async (req, res) => {
    const controller = accountController.getInstanceAccountController();
    const data = req.body;
    const isValid = await controller.verifyCredentials(data.username, data.password);
    if (isValid == true) {
        const token = await admin.auth().createCustomToken(data.username);
        res.status(200).send({ token });
      } else {
        res.status(401).send('Unauthorized');
      }
  });



// get all categories
/*app.get('/categories/all', (req, res) => {
    const controller = new categoryController();
    controller.getAllCategories().then((data) => {
    console.log(data)
    res.json(data)
    })
});*/


app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});

