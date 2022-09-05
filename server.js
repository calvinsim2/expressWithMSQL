const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("MSLearnDB", "sa", "password", {
  host: "localhost",
  port: 53687,
  dialect: "mssql",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// // for create and update. Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // for public
// for delete.
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const gameController = require("./controllers/gameController");
app.use("/api/games", gameController);

app.get("/", (req, res) => {
  res.redirect("/api/games");
});

app.listen(3500, () => {
  console.log("Start liao!");
  console.log("http://localhost:3500/");
});

// "SqlConnection": "Data Source=DESKTOP-9DKU259;Initial Catalog=GAMEDB;Integrated Security=True;"
