module.exports = function database(pool){
    async function count(){
        //var count = await pool.query("select distinct name from data");
        var promise =  new Promise((resolve,reject)=>{resolve(pool.query("select distinct name from data"))});
        return  promise
    }
    async function setData(lang, name,){
         pool
            .query("insert into data (name,language) values($1,$2)", [name,lang])
            .then(resp =>{console.log("done")})
            .catch(err => console.log(err))  
    }
     async function getData(){
        var promise = new Promise((resolve,reject)=>{resolve(pool.query("select * from data"))});
      //  var name = allNames.rows[allNames.rows.length - 1];
        return promise
    }
    async function getAllData(name){
        var all = await pool.query("select * from data");
            return all
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