import app from "./app/app";
import config from './config/index'
const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`Server is listening on port ${config.port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
startServer();
