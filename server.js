const express = require("express");
const app = express();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ExpressWithMS", "sa", "password", {
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

const User = require("./models/User")(sequelize, DataTypes);

(async () => {
  await sequelize.sync();
})();

// // for create and update. Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public")); // for public
// for delete.
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// const gameController = require("./controllers/gameController");
// app.use("/api/games", gameController);

app.get("/", async (req, res) => {
  const jane = await User.create({ name: "Jane" });
});

app.listen(3500, () => {
  console.log("Start liao!");
  console.log("http://localhost:3500/");
});

//=====================================================================================================================

// const express = require("express");
// const app = express();
// const { Sequelize, Model, DataTypes } = require("sequelize");
// const User = require("./models/User.js");

// const sequelize = new Sequelize("ExpressWithMS", "sa", "password", {
//   host: "localhost",
//   port: 53687,
//   dialect: "mssql",
// });

// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

// // const User = sequelize.define("user", {
// //   name: DataTypes.TEXT,
// //   favoriteColor: {
// //     type: DataTypes.TEXT,
// //     defaultValue: "green",
// //   },
// //   age: DataTypes.INTEGER,
// //   cash: DataTypes.INTEGER,
// // });

// (async () => {
//   await sequelize.sync();
//   // Code here
// })();

// // // for create and update. Body Parser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public")); // for public
// // for delete.
// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));

// // const gameController = require("./controllers/gameController");
// // app.use("/api/games", gameController);

// app.get("/", async (req, res) => {
//   const jane = await User.create({ name: "Jane" });
//   console.log("Jane's auto-generated ID:", jane.id);
//   // res.redirect("/api/games");
// });

// app.listen(3500, () => {
//   console.log("Start liao!");
//   console.log("http://localhost:3500/");
// });
