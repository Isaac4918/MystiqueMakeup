// imports
import express from 'express';
//import { CategoryController } from '../controllers/CategoryController';
import { ProductsController } from '../controllers/ProductsController';
import multer from 'multer';

// controllers instances
//const categoryController = CategoryController.getInstance();
const productsController = ProductsController.getInstance();

// multer configuration
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Create a new express app
const app = express();
// App configuration
app.disable('x-powered-by');
app.use(express.json());

// Define port number
const PORT = 5000;

// Define routes
// main route
app.get('/', (req, res) => {
    res.send('Welcome to the Mystique Makeup API!');
});

// ====================== CATEGORIES ======================
// get all categories
// app.get('/categories/all', (req, res) => {
//     categoryController.getAllCategories().then((data) => {
//     console.log(data)
//     res.json(data)
//     })
// });

// // post a new category
// app.post('/categories', (req, res) => {
//     const data = req.body;
//     categoryController.createCategory(data.name, data.subcategory)
//     res.send('Category created successfully');
// });

// ====================== PRODUCTS ======================
// get all products
app.get('/products/all', (req, res) => {
    res.send('All products');
});

// post a new product
app.post('/products', upload.single('image'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        console.log('No file uploaded.');
    }
    else{
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        const data = req.body;
        productsController.createProduct(data.name, data.description, data.price, data.available, blob, data.subcategory);
    }
    
});


// ====================== GENERAL USES ======================
// handling 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});


/*
const fetchData = async(user, contra) => {
        const newData = await fetch('http://localhost:5000/inicio',{
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                {"subcategory": ["Subprueba1", "Subprueba2"], "name": "PruebaAPI" }
            })
        }).then(res => res.json())
        if(newData.outResult == 0){
            console.log(true)
            navigate("/home")
        }else{
            console.log(false)
            setPasswordError(true);
        }
        
    }
*/