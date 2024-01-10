const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const { readdirSync } = require("fs");

const server = express();

const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};

server.use(express.json());
server.use(cors(options));

readdirSync("./routes").map((file) =>
  server.use("/", require("./routes/" + file))
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connected succesfully"))
  .catch((err) => console.log("unable to connect to database"));

const PORT = process.env.PORT || 11000;

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
