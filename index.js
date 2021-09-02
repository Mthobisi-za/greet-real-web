const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const body = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//{connectionString, ssl: {rejectUnauthorized: false}}
//var obj = {user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
//---require the database


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
///----factory function
const factoryFunction = require("./factory-function");
const useFactory = factoryFunction(pool)
//-----factory function*
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
//----routes----//

app.get("/", async function (req, res) {
  var data = await useFactory.getData();
  res.render('index', data);
});
/*-----about route
----method == post
----Route must get data from form
*/
app.post("/greet", async function (req, res){
  var data = req.body;
  await useFactory.setUserNameAndLang(data);
  req.flash("info", useFactory.getErrors());
  setTimeout(()=>{
      res.redirect('/')
  },100)

});
/*-----about route
----Route must reveal all the people who hve been greeted
*/
app.get("/greeted", async function (req, res) {
    var data = await useFactory.getGreeted();
    res.render('greeted', {data})
});

/*-----about route
----Route must reveal how many times a user has been greeted.
*/
app.get("/count/:name", async function (req, res) {
  var name = req.params.name;
  var data = await useFactory.getNames(name);
  res.render('specific', {data: data})
});
/*-----about route
----Route must reset the data.
*/
app.get("/reset", async function (req, res) {
  //dbLogic().resetData(res);
  await useFactory.reset();
  res.redirect('/')
});
/*-----about route
----Route must go backwards.
*/
app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
