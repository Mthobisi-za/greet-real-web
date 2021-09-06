

const dbLogic = require("./database-logic");
module.exports = function businessLogic(pool) {
  const useDb = dbLogic(pool);
  var language;
  let message;
  let example;
  //updated user values
  //-----db variables
  //-----db variables

  async function setUserNameAndLang(data) {
    var reg = /^[A-Za-z]+$/;
    var lang = "Group" in data
      if(data.name.match(reg) && lang){
        await useDb.setData(data.name, data.Group);
      } else{
        message = "Please insert correct data format and select language";
        example = "e.g: 'Mthobisi' or 'mthobisi' "
      }
  }

  async function getData() {
   var data = await useDb.getData();
   var lastIndex = data.rows[data.rows.length - 1];
   if(data.rows.length > 0){
    return {name: lastIndex.name, count: data.rows.length, language: lastIndex.language} 
   } else{
     return {count: 0}
   }
    //return userLang + "," + userLang
  }
  function getErrors() {
    return message;
  }
  async function getGreeted() {
    var obj = await useDb.getData()
    return obj.rows;
  }
  async function getNames(name) {
    var data = await useDb.getAllData(name);
    console.log(data.rows[0]);
    return  data.rows[0];
  }
  async function reset(){
   await useDb.resetData()
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
