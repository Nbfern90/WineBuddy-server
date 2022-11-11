const WineController = require("../controllers/wineController");
const { protect } = require("../middleware/authMiddleware");

module.exports = (app) => {
  app.get("/api/test", WineController.test);

  //CREATE
  app.post("/api/wine", protect, WineController.createWine);

  //READ
  app.get("/api/wine/:user_id", WineController.allWines);

  app.get("/api/wine/one/:wine_id", WineController.oneWine);

  //UPDATE
  app.put("/api/wine/one/:wine_id", protect, WineController.updateWine);
  //DELETE
  app.delete("/api/wine/one/:wine_id", protect, WineController.deleteWine);
};
