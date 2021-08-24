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
const obj = {
    user: "postgres",
    password: "mthobisi",
    database: "users",
    port: 5432, 
    ssl: false
}
const connectStr = process.env.DATABASE_URL; /*|| obj*/
const { Pool } = require("pg");
if (connectStr) {
} else {
  /*
   */
}
const pool = new Pool(obj);
module.exports = pool;
////-----pool
///----factory function
const factoryFunction = require("./factory-function");
const dbLogic = require("./database-logic");
//-----factory function
var data = {};
 async function log(){
  data["name"] = await dbLogic().getData();
  data["count"] = await dbLogic().count();
}
log();

app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
//----routes----//
/*-----about route
==method == get
----Route must serve the home page
*/

app.get("/", function(req, res){
  (async ()=>{
    //var data = dbLogic().getData()
    res.render("index", {data: data, count : data.count.length})
  })()
});
/*-----about route
----method == post
----Route must get data from form
*/
app.post("/greet", (req, res) => {
  var data = req.body;
  factoryFunction().setUserNameAndLang(data);
  log();
  res.redirect("/");
});
/*-----about route
----Route must reveal all the people who hve been greeted
*/
app.get("/greeted", (req, res) => {
  (async ()=>{
      var full = data.count;
      console.log(full)
      res.render("greeted", {arg: full})
  })()

  //dbLogic().getUniqueValues(res);
});

/*-----about route
----Route must reveal how many times a user has been greeted.
*/
app.get("/count/:name", (req, res) => {
  var name = req.params.name;
 // dbLogic().getAllData(name, res);
 
 (async ()=>{
       var allData = (await dbLogic().getAllData(name)).length;
        res.render('specific', {name: name, count : allData})
 })()

});
/*-----about route
----Route must reset the data.
*/
app.get("/reset", (req, res) => {
  //dbLogic().resetData(res);
  (async ()=>{
    await pool.query("DELETE FROM data");
     res.redirect("/");
  })()
});
/*-----about route
----Route must go backwards.
*/

app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
