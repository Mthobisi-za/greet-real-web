const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const body = require("body-parser");

app.engine("handlebars", exhbs({defaultLayout: "main", layoutsDir: "views/layout"}))
app.set("view engine", "handlebars")


app.use(body.urlencoded({extended: false}));
app.use(body.json());

app.use(express.static('public'));
const PORT = process.env.PORT || 5000;

app.get("/", (req,res)=>{
    res.render("index")
})
app.listen(PORT, ()=>{
    console.log("server started on " + PORT)
})
