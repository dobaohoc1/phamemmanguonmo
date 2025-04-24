const HyperExpress = require("hyper-express");
const orderController = require('../../controllers/orderController');
const order = new HyperExpress.Router();


order.post('/', orderController.createOrder);
order.get('/', orderController.getAllOrders);
order.get('/:id', orderController.getOrderById);
order.put('/:id', orderController.updateOrder);
order.delete('/:id', orderController.deleteOrder);

module.exports = order;
