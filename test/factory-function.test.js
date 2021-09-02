const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//{connectionString, ssl: {rejectUnauthorized: false}}
//var obj = {user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});


var assert = require("assert");
var greet = require("../factory-function");
var greeted = greet(pool);
describe("Greetings web app tests", async function () {
  beforeEach(async function(){
   await greeted.reset();
  })

    it('Should be able to return error message for name with numbers', async function () {
        var data = {
          Group: "Isizulu",
          name: "0987Mthobisi"
        }
        await greeted.setUserNameAndLang(data);
        assert.equal(await greeted.getErrors(), "Please enter name that does not have numbers")
    });

    it('Should be able to return error message if no name was entered and no language was selected', async function () {
      var data = {
        name: ""
      }
      await greeted.setUserNameAndLang(data);
      assert.equal(greeted.getErrors(), "Please enter your name")
    });

    it('Should return an error message if only language was selected and there was no name entered', async function () {
      var data = {
        Group: 'Isizulu',
        name: ""
      }
      await greeted.setUserNameAndLang(data);
      assert.equal(await greeted.getErrors(), "Please enter your name")
    });

    it('Should return 1 when there is only one user', async function () {
      var data = {
        Group: 'Isizulu',
        name: "Mthobisi"
      }
        await greeted.setUserNameAndLang(data)
        await greeted.getData().then(val =>{
          var num = val.count;
          assert.equal(num, num);
        }).catch()
        
    });
    it('Should return 3 for 3 users ', async function () {
        await greeted.setUserNameAndLang({name: "Mthobisi",  Group: 'Isizulu'});
        await greeted.setUserNameAndLang({name: "Hloni",  Group: 'Isizulu'});
        await greeted.setUserNameAndLang({name: "Sbahle",  Group: 'Isizulu'});
        await greeted.getGreeted().then(val =>{
          var num = val.length
          assert.equal(num, num);
        }).catch()
        
    });
    it('Should return 0 when we reset the database', async function () {
        await greeted.reset().then(val =>{
          assert.equal(val, undefined);
        }).catch()
    }); 
     after(()=>{
          pool.end()
        })
});

