const express = require("express");
const app = express();

var sql = require("mssql/msnodesqlv8");
var config = {
  connectionString:
    "Driver=SQL Server;Server=DESKTOP-9DKU259\\SQLEXPRESS;Database=GameDB;Trusted_Connection=true;",
};
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
