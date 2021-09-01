
const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//
//{user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
//---require the database
const dbLogic = require("./database-logic");
const useDb = dbLogic(pool);
module.exports = function businessLogic() {
  var records = [];
  var all = [];
  var userName;
  var userLang;
  var count = 0;
  let message;
  //updated user values
  //-----db variables
  //-----db variables

  function setUserNameAndLang(data) {
    var statement = "Group" in data;
    function userFix() {
      var num = records.indexOf(data.name);
      if (num == -1) {
        count = count + 1;
        userName = data.name;
        all.push(userName);
        records.push(userName);
      } else {
        userName = data.name;
        all.push(userName);
      }
    }
    function langFix() {
      if (data.Group === "English") {
        return (userLang = "Hello");
      } else if (data.Group === "Isizulu") {
        return (userLang = "Sawbona");
      } else if (data.Group === "Sesotho") {
        return (userLang = "Dumela");
      } else {
        conditions = false;
        return "";
      }
    }

    var hasNum = /\d/;

    if (data.name == "" || data.name.startsWith(" ")) {
      message = "Please enter your name";
    } else if (hasNum.test(data.name)) {
      message = "Please enter name that does not have numbers";
    } else {
      if (statement) {
        userFix();
        langFix();
        message = "";
        (async ()=>{
          await useDb.setData(userLang, userName);
        })();
       
      } else {
        if (
          message !== undefined ||
          message == "Please enter name that does not have numbers" ||
          message == "Please enter your name"
        ) {
          message = message + " and select language";
        } else {
          message = "Please select language";
        }
      }
    }
  }

  async function getData() {
   
        var data = await useDb.count().then(val => {return val.rows.length});
        var name = await useDb.getData().then(val =>{
        var obj = val.rows[val.rows.length-1];
        try {
          return {  name :obj.name, language: obj.language  };
        } catch (error) {
          return {}
        }
        
      }).catch(err => console.log(err));

   var condition = name.hasOwnProperty("name") && name.hasOwnProperty("language");
   console.log(condition)
   if(condition){
     return {count: data, name: name.name, language: name.language}
   } else{
     return{count: 0}
   }
  
     
   
      
    //return userLang + "," + userLang
  }
  function getErrors() {
    return message;
  }
  async function getGreeted() {
    var obj = await useDb.count().then(val => {return val.rows}).catch(err => console.log(err))
    return obj;
  }
  async function getNames(name) {
    var names = await useDb.getData().then(val =>{
      var count = [];
      val.rows.forEach(element =>{
        console.log(element)
        if(element.name == name){
          count.push(element.name)
        }
      })
       return count.length;
    }).catch(err => console.log(err));
    /*
    var correct = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i] == name) {
        correct.push(all[i]);
      } else {
      }
    } */
    return { count: names, name };
  }
  async function reset(){
   await useDb.resetData().then(val =>{}).catch(err => console.log(err))
  }
  
  return {
    setUserNameAndLang,
    getData,
    getGreeted,
    getNames,
    getErrors,
    reset
  };
};
