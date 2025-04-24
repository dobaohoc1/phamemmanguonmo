const HyperExpress = require("hyper-express");
const productController = require('../../controllers/productController');
const product = new HyperExpress.Router();


product.post('/', productController.createProduct);
product.get('/', productController.getAllProducts);
product.get('/:id', productController.getProductById);
product.put('/:id', productController.updateProduct);
product.delete('/:id', productController.deleteProduct);

module.exports = product;
