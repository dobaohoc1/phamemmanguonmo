const HyperExpress = require("hyper-express");
const { ejsRender } = require("./src/utils/ejsRender");
const { liveDirectory } = require("./src/utils/liveDirectory");

const cors = require("cors");

const api_v1_router = require("./src/api/v1");
const indexRouter = require("./src/routes");

require("./configs/database")
  .sync({ force: true, alter: true })
  .then(async () => {
    console.log("Database is ready/Đã kết nối database");
  });



const webserver = new HyperExpress.Server({
  max_body_length: 1024 * 1024 * 1024,
});

webserver.use(cors());

webserver.use(ejsRender);
webserver.get("/assets/*", liveDirectory);

webserver.use("/api/v1", api_v1_router);

webserver.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

webserver
  .listen(PORT)
  .then((socket) => console.log(`Webserver started on port http://127.0.0.1:${PORT}`))
  .catch((error) => console.log(`Failed to start webserver on port ${PORT}`));
