const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.checkUserAuth = async (request, response) => {
  try {
    let token = request.cookies.token;
    if (token) {
      const data = jwt.verify(token, "test");
      const user = await User.findByPk(data.userId);
      if (!user) {
        return response.status(404).clearCookie("token").redirect("/");
      }
      response.locals.user = {
        username: user.username,
        email: user.email,
        token: user.token,
        role: user.role,
      };
    } else {
      response.locals.user = {
        role: 'guess',
      };
      if (["/", "/auth/signin", "/auth/signup"].includes(request.path)) return;

      return response.status(404).redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
};
