//const { reporters } = require("mocha");
const pool = require("./index");
module.exports = function database(){
    async function count(){
        var count =await pool.query("SELECT DISTINCT name FROM data")
        return  count.rows
    }
    async function setData(lang, name,){
         pool
            .query("INSERT INTO data (name,language) VALUES($1,$2)", [name,lang])  
            .then(resp =>{console.log("done")})
            .catch(err => console.log(err))  
    }
     async function getData(){
        var allNames = await pool.query("SELECT * FROM data")
        var name = allNames.rows[allNames.rows.length - 1];
        return name
    }
    async function getAllData(name){
        var count = []
        var all = (await pool.query("SELECT * FROM data")).rows
                all.forEach(element =>{
                    if(element.name == name){
                        count.push(element.name)
                    }
                })
                /* 
                setTimeout(() => {
                    res.render('specific', {name: name, count : count.length})
                }, 10); */
            return count
    }
    async function resetData(res){
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
        getAllData,
        resetData,
        count
    }
}