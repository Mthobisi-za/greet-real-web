module.exports = function database(pool){
    async function setData(name,language){
         //check if the name exist...
        var checkname = await pool.query(`SELECT name from data WHERE name = $1`, [name]);
        //if not insert the name...
                    if (checkname.rowCount < 1) {
        
                        await pool.query(`INSERT INTO data (name,count,language) VALUES ($1,$2,$3)`, [name, 1, language])
                    }
        //if name exist update the counter for that name...
                    else {
                        await pool.query(`UPDATE data SET  count= count + 1, language = $2 WHERE name = $1`, [name, language])
                    }
            
    }
     async function getData(){
         var data = await pool.query("select * from data")
         return data;
    }
    async function getAllData(name){
        var all = await pool.query("select * from data where name = $1 ",[name]);
        return all
    }
    async function resetData(){
       await pool.query("delete from data");
    }
    return{
        setData,
        getData,
        getAllData,
        resetData
    }
}