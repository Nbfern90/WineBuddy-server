const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGOOSE IS ON THE LOOSE"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );
