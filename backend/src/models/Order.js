const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

class Order extends Model { }

Order.init({
    customerId: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'pending',
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    note: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    payment: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'pending',
    },
}, {
    sequelize,
    modelName: 'order',
});

module.exports = Order;