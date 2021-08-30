const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const body = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

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
  ssl: false,
};
const connectionString = process.env.DATABASE_URL; /*|| obj*/
const { Pool } = require("pg");
if (connectionString) {
} else {
  /*
   */
}
//
const pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
////-----pool
///----factory function
const factoryFunction = require("./factory-function");
const dbLogic = require("./database-logic");
const useFactory = factoryFunction()
//-----factory function*
/*
var data = {};
 async function log(){
  data["name"] = await dbLogic().getData();
  data["count"] = await dbLogic().count();
}
log();
*/
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
//----routes----//

app.get("/", function (req, res) {
  
  (async () => {
    //await gett()
    var promise = new Promise((resolve, reject) => {
      resolve(pool.query("select * from data"));
    })
      .then((value) => {
        var obj = { count: 0 };
        var array = [];
        var data = value.rows;
        try {
          for (let i = 0; i < data.length; i++) {
            var name = data[i].name;
            if (array.indexOf(name) === -1) {
              obj.count = obj.count +1;
              array.push(name);
            }
          }
          var actualD = data[data.length - 1];
          console.log(actualD)
          obj["name"] = actualD.name;
          obj["language"] = actualD.language;
        } catch (error) {
          console.log("error");
        }
        console.log(obj)
        res.render("index", { data: obj });
      })
      .catch((err) => console.log(err));
  })();
});
/*-----about route
----method == post
----Route must get data from form
*/
app.post("/greet", (req, res) => {
  var data = req.body;
  var actualD = factoryFunction().setUserNameAndLang(data);
  try {
    var condition = actualD.hasOwnProperty("userName") && actualD.hasOwnProperty("userLang");
    if (condition) {
      (async () => {
        req.flash("info", "");
        var promise = new Promise((resolve, reject) => {
          resolve(pool.query("insert into data (name,language) values($1,$2)", [data.name,actualD.userLang]));
        })
          .then(val =>{})
          .then(val => res.redirect('/'))
          .catch((err) => console.log(err));
      })();
    }
  } catch (error) {
    req.flash("info", useFactory.getErrors());
    res.redirect("/");
  }
});
/*-----about route
----Route must reveal all the people who hve been greeted
*/
app.get("/greeted", (req, res) => {
  (async () => {
    var full = await dbLogic(pool).count().then(val =>{
       res.render("greeted", { arg:  val.rows});
    })
    .catch(err => console.log())
    // console.log(full)
   
  })();
  //dbLogic().getUniqueValues(res);
});

/*-----about route
----Route must reveal how many times a user has been greeted.
*/
app.get("/count/:name", (req, res) => {
  var name = req.params.name;
  // dbLogic().getAllData(name, res);

  (async () => {
      var allData = await dbLogic(pool).getAllData(name).then(val =>{
        var count = []
        val.rows.forEach(element =>{
          if(element.name == name){
              count.push(element.name)
          }
      })
        res.render("specific", { name: name, count: count.length });
      });
    
    
  })();
});
/*-----about route
----Route must reset the data.
*/
app.get("/reset", (req, res) => {
  //dbLogic().resetData(res);
  (async () => {
   var promise =  await pool.query("DELETE FROM data").then(val =>{
      res.redirect("/");
   })
   .catch(err => console.log(er))
  })();
});
/*-----about route
----Route must go backwards.
*/
app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
