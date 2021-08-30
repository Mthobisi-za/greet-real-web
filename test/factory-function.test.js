var assert = require("assert");
var greet = require("../factory-function");

describe("Greetings web app", () => {
  it("should set the username and language", () => {
    var greeted = greet();
    var data = {
      name: "Mthobisi",
      Group: "Isizulu",
    };
    assert.deepEqual(greeted.setUserNameAndLang(data), {
      userName: "Mthobisi",
      userLang: "Sawbona",
    });
  });
  it("should get or return the recorded data", () => {
    var greeted = greet();
    var data = {
      name: "Mthobisi",
      Group: "Isizulu",
    };
    greeted.setUserNameAndLang(data);
    assert.deepEqual(greeted.getData(), {
      userLang: "Sawbona",
      userName: "Mthobisi",
      count: 1,
    });
  });
  it("should get all greeted names", () => {
    var greeted = greet();
    var data = {
      name: "Mthobisi",
      Group: "Isizulu",
    };
    greeted.setUserNameAndLang(data);
    greeted.getData();
    greeted.setUserNameAndLang({
      name: "Hloni",
      Group: "Isizulu",
    });
    greeted.getData();
    var all = [{ name: "Mthobisi" }, { name: "Hloni" }];
    assert.deepEqual(greeted.getGreeted(), all);
  });
  it("should be able to get the number of times a user has been greeted", () => {
    var greeted = greet();
    var actual = {
      correct: ["Mthobisi", "Mthobisi"],
      num: 2,
      name: "Mthobisi",
    };
    var data = { name: "Mthobisi", Group: "Isizulu" };
    greeted.setUserNameAndLang(data);
    greeted.getData();
    var dataa = { name: "Mthobisi", Group: "English" };
    greeted.setUserNameAndLang(dataa);
    greeted.getData();
    assert.deepEqual(greeted.getNames("Mthobisi"), actual);
  });
});
