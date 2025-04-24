const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

class Customer extends Model { }

Customer.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phonenumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sex: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'customer',
});

module.exports = Customer;