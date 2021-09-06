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

//-----factory function*
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
//----routes----//

//routes
var routes = require("./routes/routes-greet")
var useRoot = routes();

app.get("/", useRoot.home);
app.post("/greet", useRoot.makeChanges);
app.get("/greeted", useRoot.showGreeted);
app.get("/count/:name", useRoot.specificName);
app.get("/reset", useRoot.goToDefault);

app.listen(PORT, () => {
  console.log("server started on " + PORT);
});
