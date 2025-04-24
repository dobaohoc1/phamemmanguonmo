const HyperExpress = require("hyper-express");
const { checkUserAuth } = require("../../middlewares/auth-middleware");

const userController = require("../../controllers/userController");

const user = new HyperExpress.Router();

user.post("/signup", userController.userRegistration);
user.post("/signin", userController.userLogin);
user.get("/logout", checkUserAuth, userController.loggedUser);


user.post('/', userController.createUser);
user.get('/', userController.getAllUsers);
user.get('/:id', userController.getUserById);
user.put('/:id', userController.updateUser);
user.delete('/:id', userController.deleteUser);

module.exports = user;
