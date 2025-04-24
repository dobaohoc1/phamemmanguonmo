const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    try {
        const body = await req.json();
        const customer = await Customer.create(body);
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ message: 'Failed to create customer', error });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Failed to fetch customers', error });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ message: 'Failed to fetch customer', error });
    }
};

exports.updateCustomer = async (req, res) => {
    try {;
        const { id } = req.path_parameters;
        const body = await req.json();
        const [updated] = await Customer.update(body, {
            where: { id },
        });
        if (!updated) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        const updatedCustomer = await Customer.findByPk(id);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Failed to update customer', error });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Customer.destroy({
            where: { id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer', error });
    }
};