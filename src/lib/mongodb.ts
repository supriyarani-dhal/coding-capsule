import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

//the property "isConnected" is optional , so the variable connection can be empty also
const connection: connectionObject = {};

async function connectDB(): Promise<void> {
  //first check the database is connected or not
  if (connection.isConnected) {
    console.log("database has already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
    console.log("DATABASE connected successfully");
  } catch (error) {
    console.log("DATABASE connection failed", error);
    process.exit(1);
  }
}

export default connectDB;
