const HyperExpress = require("hyper-express");
const auth = require("./authRoute");
const { checkUserAuth } = require("../middlewares/auth-middleware");
const indexRouter = new HyperExpress.Router();

indexRouter.get("/", checkUserAuth, (request, response) => {
  response.render("pages/index.ejs", { locals: response.locals });
});
indexRouter.use("/auth", auth);

module.exports = indexRouter;
