const express = require("express");
const router = express.Router();
// let games = require("../models/seedGame.js");
let games = [];
router.use(express.urlencoded({ extended: false }));
const { Sequelize } = require("sequelize");

// var sql = require("mssql/msnodesqlv8");
// var config = {
//   connectionString:
//     "Driver=SQL Server;Server=DESKTOP-9DKU259\\SQLEXPRESS;Database=GameDB;Trusted_Connection=true;",
// };

const sequelize = new Sequelize("MSLearnDB", "sa", "password", {
  host: "localhost",
  port: 53687,
  dialect: "mssql",
});

// index
router.get("/", (req, res) => {
  sequelize.connect(config, (err) => {
    new sql.Request().query("SELECT * FROM Game", (err, result) => {
      console.log(".:The Good Place:.");
      if (err) {
        // SQL error, but connection OK.
        console.log(err);
      } else {
        // All is rosey in your garden.
        console.dir("no error, db started");
        games = result.recordset;
      }
    });
  });
  sql.on("error", (err) => {
    // Connection borked.
    console.log(".:The Bad Place:.");
    console.log("  Fork: " + err);
  });

  res.render("index.ejs", {
    allGames: games,
  });
});

//Create
router.post("/", (req, res) => {
  //(' + date + ',' + pName + '))
  sql.connect(config, (err) => {
    new sql.Request().query(
      "INSERT INTO Game ([GameName], [GameDescription], [GameRating]) VALUES ('" +
        req.body.name +
        "', '" +
        req.body.description +
        "', '" +
        req.body.rating +
        "')",

      (err, result) => {
        console.log(result);
        if (err) {
          // SQL error, but connection OK.
          console.log(err);
        } else {
          // All is rosey in your garden.
          console.dir("entry successfully added");
        }
      }
    );
  });
  sql.on("error", (err) => {
    // Connection borked.
    console.log(".:The Bad Place:.");
    console.log("  Fork: " + err);
  });
  // games.push(req.body);
  res.redirect("/api/games/");
});

// New

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

// // Edit
// router.get("/edit/:index/", (req,res) => {
//     res.render("edit.ejs", {
//         selectGame: games[req.params.index],
//         id: req.params.index,
//     })
// })

// router.put("/:index/", (req,res) => {
//     games[req.params.index] = req.body
//     res.redirect("/api/games/")
// })

// Delete

router.delete("/:index/", (req, res) => {
  games.splice(req.params.index, 1);
  res.redirect("/api/games/");
});

// show
router.get("/:index/", (req, res) => {
  res.render("show.ejs", {
    eachGame: games[req.params.index],
    id: req.params.index,
  });
});

module.exports = router;
