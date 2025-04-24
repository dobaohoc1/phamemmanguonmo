const HyperExpress = require("hyper-express");
const { checkUserAuth } = require("../middlewares/auth-middleware");

const auth = new HyperExpress.Router();

auth.use(checkUserAuth);

auth.get('/', async (request, response) => {
  if (response.locals.user) {
    return response.status(302).redirect("/auth/signin");
  }

})

auth.get("/signup", async (request, response) => {
  if (response.locals.user.token) {
    return response.status(302).redirect("/");
  }
  response.render("./auth/sign_up.ejs", { locals: response.locals });
});
auth.get("/signin", async (request, response) => {
  if (response.locals.user.token) {
    return response.status(302).redirect("/");
  }
  response.render("./auth/sign_in.ejs", { locals: response.locals });
});

module.exports = auth;
