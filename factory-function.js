/*const dblogic = require("./db-factory");
const useDb = dblogic();
const {Pool} = require("pg");
var connectStr = require("./poo")
var pool = new Pool(connectStr);
*/
//---require the database
const dbLogic = require("./database-logic");
module.exports = function businessLogic() {
  var virtualD1 = [];
  var virtualD2 = []
  var records = [];
  var all = []
  var userName;
  var userLang;
  var count = 0;
  let message;
  //updated user values

  function setUserNameAndLang(data) {
    var statement = "Group" in data;
        function userFix() {
                var num = records.indexOf(data.name); 
                if(num == -1){
                    count = count + 1;
                    userName = data.name;
                    all.push(userName)
                    records.push(userName)
                }  else{
                    userName = data.name;
                    all.push(userName)
              }
        }  
        function langFix(){
                if (data.Group === "English") {
                return userLang = "Hello";
                }  else if (data.Group === "Isizulu") {
                return userLang = "Sawbona";
                } else if (data.Group === 'Sesotho') {
                return userLang = "Dumela";
                }else {
                conditions = false
                return ""
                }
        }
        
        var hasNum = /\d/;
        
       if(data.name == "" || data.name.startsWith(" ")){
        message = "Please enter your name"
       } else if(hasNum.test(data.name)){
          message = "Please enter name that does not have numbers" 
       }else{
        if(statement){
          userFix();
          langFix();
          message = "";
          dbLogic().setData(userLang,userName)
            return "true"
        }else {
         
          if(message !== undefined|| message == "Please enter name that does not have numbers" || message =="Please enter your name"){
            message = message + " and select language"
          }else{
            message = "Please select language"
          }
          return "false"
          
        }
       }
  }

  function getData() {
    return {
      userLang,
      userName,
      count,
    };
   //return userLang + "," + userLang
  }
  function getErrors(){
    return{
      message
    }
  }
  function getGreeted(){
  var correct = [];
    for(let i = 0; i < records.length; i++){
      correct.push({name: records[i]})
    }
    return correct
  }
  function getGreetedDb(arry){
    var correct = [];
      for(let i = 0; i < arry.length; i++){
        correct.push({name: arry[i]})
      }
      return correct
    }
  function getNames(name){
    var correct = [];
    for(let i = 0; i < all.length; i++){
      if(all[i] == name){
        correct.push(all[i])
      } else{

      }
    } var num = correct.length;
    return {correct, num, name}
  }
  
  function condition(){
    if(userLang  == undefined || userName ==undefined){
      console.log(userName,userLang)
      return "undefined"
    }else{
      console.log(userName,userLang)
      return "defined"
    }
  }
  function getNamesDb(name,res){
    var arg;
    var correct =[]
    pool
      .query("SELECT name FROM connecttb")
      .then(resp =>{
        arg = resp.rows;
      for(let i = 0; i < arg.length; i++){
          if(arg[i].name == name){
            correct.push(arg[i])
          } else{

          }
        }
      })
      .then(resp =>{ 
        var num = correct.length;
        var data = {correct,name, num}
        res.render("specific", {data: data});
      })
      .catch(err =>{
        console.log(err)
      })
  }
  return {
    setUserNameAndLang,
    getData,
    getGreeted,
    getGreetedDb,
    getNames,
    getErrors,
    condition,
    getNamesDb
  };
};
