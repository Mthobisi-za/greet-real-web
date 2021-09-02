const {Pool} = require("pg");
// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL;
//{connectionString, ssl: {rejectUnauthorized: false}}
//var obj = {user: "postgres",host: "localhost",database: "users",password: "mthobisi",port: 5432}
var pool = new Pool({connectionString, ssl: {rejectUnauthorized: false}});


var assert = require("assert");
var greet = require("../factory-function");
var greeted = greet();
describe("Greetings web app", async function () {
  beforeEach( async function (){
    await greeted.reset()
  });
  it('Should store data', () => {
    var data = {
      Group: "Isizulu",
      name: "MthobisiDb",
    }
    assert.equal(greeted.setUserNameAndLang(data), undefined);
  });

  it('Should return the data', async function() {
    var actaul = {
      count: 0,
      language: 'Sawbona',
      name: 'MthobisiDb'
    }
    assert.deepEqual(await greeted.getData(),actaul);
  })

  it('Should return the list of greeted people', async function(){
    var list = [];
    assert.deepEqual(await greeted.getGreeted(), list)
  });
  it('Should return the number of times a user has been greeted', async function(){
    var data ={
      count: 0,
      name: 'MthobisiDb'
    }
    assert.deepEqual(await greeted.getNames("MthobisiDb"), data)
  });

  it('Should get the error messages', async function(){
    var data = {
      name: "",
      Group: ""
    };
    var err = "Please enter your name";
    greeted.setUserNameAndLang(data);
    assert.equal(await greeted.getErrors(), err);
  });

  after(async function(){
  // await greeted.reset();
      pool.end()
  })
});
