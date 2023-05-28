import mongoose from "mongoose";
import config from "../../config/index";

export const dbConnect = async (): Promise<void> => {
  try {
    if (!config.database_uri) {
      console.log("URI is not found");
      process.exit(1);
    }
    await mongoose.connect(config.database_uri);
    console.log("Database is connected");
  } catch (error) {}
};
