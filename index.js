const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const body = require("body-parser");

app.engine(
  "handlebars",
  exhbs({ defaultLayout: "main", layoutsDir: "views/layout" })
);
app.set("view engine", "handlebars");
///-----pool
/*
const obj = {
    user: "postgres",
    password: "mthobisi",
    database: "users",
    port: 5432, 
    ssl: true
}*/
const connectStr = process.env.DATABASE_URL; /*|| obj*/
const { Pool } = require("pg");
if (connectStr) {
} else {
  /*
   */
}
const pool = new Pool({ connectStr, ssl: true });
module.exports = pool;
////-----pool

app.use(body.urlencoded({ extended: false }));
app.use(body.json());
///----factory function
const factoryFunction = require("./factory-function");
const dbLogic = require("./database-logic");
//-----factory function
app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
//----routes----//
/*-----about route
==method == get
----Route must serve the home page
*/
app.get("/", (req, res) => {
  // dbLogic().getData(res);
  /*
  pool
    .query("SELECT DISTINCT name FROM data")
    .then((resp) => {
      resp.rows.forEach((element) => {
        obj.count++;
      });
    })
    .catch((err) => console.log(err)); */
  pool
    .query("SELECT * FROM data")
    .then((resp) => {
      var name = resp.rows[resp.rows.length - 1]
        res.render("index", { data: name /*, count: obj.count*/ });
    })
    .catch((err) => console.log(err));
});
/*-----about route
----method == post
----Route must get data from form
*/
app.post("/greet", (req, res) => {
  var data = req.body;
  factoryFunction().setUserNameAndLang(data, res);
});
/*-----about route
----Route must reveal all the people who hve been greeted
*/
app.get("/greeted", (req, res) => {
  dbLogic().getUniqueValues(res);
});

/*-----about route
----Route must reveal how many times a user has been greeted.
*/
app.get("/count/:name", (req, res) => {
  var name = req.params.name;
  dbLogic().getAllData(name, res);
});
/*-----about route
----Route must reset the data.
*/
app.get("/reset", (req, res) => {
  dbLogic().resetData(res);
});
/*-----about route
----Route must go backwards.
*/
app.get("/home", (req, res) => {
  res.redirect("/");
});
app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
