// IMPORT EXPRESS AND CREATE AN INSTANCE OF EXPRESS SERVER
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const port = 8000; //the port # our server is running on
const cors = require("cors");
app.use(cors());

//CONNECT MONGOOSE TO THE MONGODB
require("./config/mongoose.config");

// CONFIGURRATION FOR YOUR EXPRESS SERVER ONLY
app.use(express.json()); //allows us to always return in json
app.use(express.urlencoded({ extended: false })); //helps us to recieve post requests

// DEFINE ROUTES FOR YOUR EXPRESS SERVER ONLY

const WineRoutes = require("./routes/wineRoutes");
WineRoutes(app);

const UserRoutes = require("./routes/userRoutes");
UserRoutes(app);

//SERVE FRONTEND
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Set To Production"));
}

//EXPRESS ERROR HANDLING: THIS MUST BE UNDER YOUR ROUTES!!!
const { errorHandler } = require("./middleware/errorMiddleware");
app.use(errorHandler);

// RUN YOUR EXPRESS SERVER
app.listen(port, () => console.log(" Mic Check...1...2, Running on " + port)); //this executes are starts up the server
