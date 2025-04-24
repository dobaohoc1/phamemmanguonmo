const HyperExpress = require('hyper-express');
const user = require('./user');
const order = require('./order');
const product = require('./product');
const customer = require('./customer');
const api_v1_router = new HyperExpress.Router();

api_v1_router.use('/user', user);
api_v1_router.use('/order', order);
api_v1_router.use('/product', product);
api_v1_router.use('/customer', customer);


module.exports = api_v1_router;