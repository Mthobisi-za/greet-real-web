//const { reporters } = require("mocha");
const pool = require("./index");
module.exports = function database(){
    var obj = {count: 0}
    function setData(lang, name, res){
        pool
            .query("INSERT INTO data (name,language) VALUES($1,$2)", [name,lang])
            .then(resp => {
                setTimeout(() => {
                    res.redirect("/")
                }, 10);
            })
            .catch(err => console.log(err))
    }
    function getData(res){
        pool
            .query("SELECT DISTINCT name FROM data")
            .then(resp =>{
                resp.rows.forEach(element =>{
                    obj.count ++
                })
            })
            .catch(err => console.log(err))
        pool
            .query("SELECT * FROM data")
            .then(resp =>{
                 var name = resp.rows[resp.rows.length - 1];
                setTimeout(() => {
                   res.render("index", {data: name, count: obj.count})
                }, 10);
            })
            .catch(err => console.log(err))
    }
    function getUniqueValues(res){
        pool
            .query("SELECT DISTINCT name FROM data")
            .then(resp =>{
                var arg = [];
                resp.rows.forEach(element =>{
                    arg.push(element.name)
                });
                setTimeout(() => {
                    res.render("greeted", {arg})
                }, 10);
            })
            .catch(err => console.log(err))
    }
    function getAllData(name,res){
        pool
            .query("SELECT * FROM data")
            .then(resp =>{
                var count = [];
                resp.rows.forEach(element =>{
                    if(element.name == name){
                        count.push(element.name)
                    }
                })
                setTimeout(() => {
                    res.render('specific', {name: name, count : count.length})
                }, 10);
            })
    }
    function resetData(res){
        pool
            .query("DELETE FROM data")
            .then(resp =>{
                res.redirect("/");
            })
            .catch(err => console.log(err))
    }
    return{
        setData,
        getData,
        getUniqueValues,
        getAllData,
        resetData
    }
}