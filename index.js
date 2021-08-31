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
  console.log(data)
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
