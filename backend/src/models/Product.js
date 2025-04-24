const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../configs/database');

class Product extends Model { }

Product.init({
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'active',
    },
    type: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    supplier: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    receipt: {

        type: DataTypes.STRING(255),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'product',
});

module.exports = Product;