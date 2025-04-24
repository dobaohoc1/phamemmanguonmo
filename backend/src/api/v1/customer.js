const HyperExpress = require("hyper-express");
const customerController = require('../../controllers/customerController');
const customer = new HyperExpress.Router();


customer.post('/', customerController.createCustomer);
customer.get('/', customerController.getAllCustomers);
customer.get('/:id', customerController.getCustomerById);
customer.put('/:id', customerController.updateCustomer);
customer.delete('/:id', customerController.deleteCustomer);

module.exports = customer;
