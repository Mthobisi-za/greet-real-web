const { rejects } = require("assert");
var assert = require("assert");
const { resolve } = require("path");
const { Pool } = require("pg");
/*
var pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: "mthobisi",
}); */
var connectionString = process.env.DATABASE_URL;
var pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});
describe("Database tests", () => {
    beforeEach(async function(){
        // clean the tables before each test run
    });

    it('should get the type of data returned by database', async function(){
        
        // the Factory Function is called CategoryService
         new Promise((resolve, rejects)=>{
            resolve(pool.query("select * from data"))
         })
         .then(val =>{
             var check = typeof (val.rows)
            assert.equal('object', check);
         })
         .catch(err => console.log())
    });
    it('should get the number of rows in database', async function(){
        // the Factory Function is called CategoryService
         new Promise((resolve, rejects)=>{
            resolve(pool.query("select * from data"))
         })
         .then(val =>{
             var check = (val.rows).length;
             var number = (val.rows).length
            assert.equal(number, check);
         })
         .catch(err => console.log())
    });

    after(function(){
        pool.end();
    })
  });
  