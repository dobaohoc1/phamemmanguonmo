const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class UserController {
  static userRegistration = async (request, response) => {
    const { username, email, password, confirmPassword } = await request.json();
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        response
          .status(401)
          .json({ status: "failed", message: "Email này đã tạo trước đó" });
      } else {
        if (username && email && password && confirmPassword) {
          if (password === confirmPassword) {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const user = await User.create({
              username,
              email,
              password: hashPassword,
              role: "user",
              emailVerified: true,
            });
            const token = jwt.sign({ userID: user.id }, "test", {
              expiresIn: "5d",
            });
            response.status(200).json({
              status: "success",
              message: "Đăng ký tài khoản thành công",
              user: {
                username: user.username,
                email: user.email,
                role: user.role,
                emailVerified: user.emailVerified,
                _id: token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
              },
            });
          } else {
            response.json({
              status: "failed",
              message: "Mật khẩu không khớp!",
            });
          }
        } else {
          response
            .status(401)
            .json({ status: "failed", message: "Tất cả trường đều chưa nhập" });
        }
      }
    } catch (error) {
      console.log(error);
      response
        .status(502)
        .json({ status: "failed", message: "Không thể đăng ký" });
    }
  };

  static userLogin = async (request, response) => {
    const { email, password, remember } = await request.json();
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return response.status(401).json({
          status: "failed",
          message: "Email hoặc Mật khẩu không chính xác",
        });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return response.status(401).json({
          status: "failed",
          message: "Email hoặc Mật khẩu không chính xác",
        });
      }
      const expiresAt =
        Math.floor(Date.now() / 1000) +
        (remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60);

      const token = jwt.sign({ userId: user.id }, "test");

      return response
        .cookie("token", token, {
          expires: new Date(expiresAt * 1000), // convert to milliseconds
          path: "/*",
          secure: false, // set to true if your site uses HTTPS
          sameSite: "strict",
        })
        .json({
          status: "success",
          message: "Đăng nhập thành công",
          token: token,
          expiresAt: expiresAt,
        });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ status: "failed", message: "Internal Server Error" });
    }
  };

  static loggedUser = async (request, response) => {
    try {
      return response
        .status(200)
        .cookie("token", "", { expires: new Date(Date.now() - 1000) })
        // .clearCookie("token")
        .redirect('/')
      // .json({ status: "success", message: "Đăng xuất thành công" });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ status: "failed", message: "Internal Server Error" });
    }
  };
}


exports.createUser = async (req, res) => {
    try {
        const body = await req.json();
        const user = await User.create(body);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Failed to fetch user', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const body = await req.json();
        const [updated] = await User.update(body, {
            where: { id },
        });
        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByPk(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id },
        });
        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};

module.exports = UserController;
