import { create, defaults, router } from "json-server";
import defaultData from "./default-data.json";

const app = create();
const serverRouter = router(defaultData);
const middlewares = defaults();

let server = null;

const runServer = () => {
  app.use(middlewares);
  app.use(serverRouter);
  server = app.listen(3000, () => {});
};

const stopServer = () => {
  server.close(() => {});
};

export const testJsonServer = {
  runServer,
  stopServer,
};
