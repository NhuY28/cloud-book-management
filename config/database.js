const dns = require("dns");
dns.setServers(["1.1.1.1"]);
const mongoose = require("mongoose");


const readConnection = mongoose.createConnection(
  process.env.MONGODB_READ_URI,
  {
    dbName: process.env.DB_NAME,
  }
);

const writeConnection = mongoose.createConnection(
  process.env.MONGODB_WRITE_URI,
  {
    dbName: process.env.DB_NAME,
  }
);

readConnection.on("connected", () => {
  console.log("MongoDB READ connection established");
});

readConnection.on("error", (error) => {
  console.error("MongoDB READ error:", error.message);
});

writeConnection.on("connected", () => {
  console.log("MongoDB WRITE connection established");
});

writeConnection.on("error", (error) => {
  console.error("MongoDB WRITE error:", error.message);
});

module.exports = {
  readConnection,
  writeConnection,
};