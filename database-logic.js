//const { reporters } = require("mocha");
const pool = require("./index");
module.exports = function database(){
    async function count(){
        var count = await pool.query("select distinct name from data");
        return  count.rows
    }
    async function setData(lang, name,){
         pool
            .query("insert into data (name,language) values($1,$2)", [name,lang])
            .then(resp =>{console.log("done")})
            .catch(err => console.log(err))  
    }
     async function getData(){
        var allNames = await pool.query("select * from data");
        var name = allNames.rows[allNames.rows.length - 1];
        return name
    }
    async function getAllData(name){
        var count = []
        var all = (await pool.query("select * from data")).rows;
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
    async function resetData(){
        pool
            .query("delete from data")
            .then(resp =>{
               
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