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
const pool = new Pool({connectStr, ssl: true});
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

app.get("/", function(req, res){
  // dbLogic().getData(res);
   var names;
   var name;
   var count;
    (async()=>{
      names = await pool.query('SELECT * FROM data');
       name = await names.rows[names.rows.length -1 ];
      //console.log(names.rows, name)
       count = await pool.query("SELECT DISTINCT name FROM data");
     // console.log(name.name, name.language, count.rows.length);
      
    })()
    res.render("index", {data: name, count: count.rows.length})
});
/*-----about route
----method == post
----Route must get data from form
*/
app.post("/greet", (req, res) => {
  var data = req.body;
  factoryFunction().setUserNameAndLang(data);
  res.redirect("/");
});
/*-----about route
----Route must reveal all the people who hve been greeted
*/
app.get("/greeted", (req, res) => {
  (async ()=>{
      var names = await pool.query("SELECT DISTINCT name FROM data");
      var arg = []
      names.rows.forEach(element =>{
        arg.push(element.name)
    }); 
      res.render("greeted", {arg})
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
    var names = await pool.query("SELECT * FROM data");
    var array = names.rows;
    var count = [];
         array.forEach(element =>{
        if(element.name == name){
            count.push(element.name)
          }
       })
        res.render('specific', {name: name, count : count.length})
 })()

});
/*-----about route
----Route must reset the data.
*/
app.get("/reset", (req, res) => {
  //dbLogic().resetData(res);
  (async ()=>{
    await pool.query("DELETE FROM data");
     res.redirect("/home");
  })()
});
/*-----about route
----Route must go backwards.
*/

app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
