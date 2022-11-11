const UserController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

module.exports = (app) => {
  app.post("/api/users", UserController.register);
  app.post("/api/users/login", UserController.userLogin);
  //READ
  app.get("/api/users/me", protect, UserController.getMe); //protect,
  app.get("/api/users/all", UserController.allUsers);
  app.get("/api/users/all/:user_id", UserController.oneUser);
};
