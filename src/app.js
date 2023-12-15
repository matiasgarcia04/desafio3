const express = require('express');
const newManager = require('./ProductManager');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = newManager.getProducts();
  const response = limit ? products.slice(0, limit) : products;
  res.send(response);
  console.log(newManager.getProducts());
});

app.get('/products/:pid', async (req, res) => {
    const {pid} = req.params;
    const theproduct = await newManager.getProductById(pid);
    if (theproduct) {
        res.send(theproduct);
        console.log(theproduct);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});