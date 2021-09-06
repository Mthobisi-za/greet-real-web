
const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//{connectionString, ssl: {rejectUnauthorized: false}}
var obj = {user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool;
if(connectionString){
  pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
} else{
  pool = new Pool(obj)
}
//---require the database

const factoryFunction = require("../factory-function");
const useFactory = factoryFunction(pool)

module.exports = function routes(){
    async function home(req,res){
        var data = await useFactory.getData();
        res.render('index', data);
    }
    async function makeChanges(req,res){
      var data = req.body;
      useFactory.setUserNameAndLang(data);
      req.flash("info", useFactory.getErrors());
          res.redirect('/')
    }
    async function showGreeted(req,res){
      var data = await useFactory.getGreeted();
      res.render('greeted', {data});
    }
    async function specificName(req,res){
      var name = req.params.name;
      var data = await useFactory.getNames(name);
      res.render('specific', {data})
    }
    async function goToDefault(req,res){
      await useFactory.reset();
      res.redirect('/')
    }
    return{
        home,
        makeChanges,
        showGreeted,
        specificName,
        goToDefault
    }
}