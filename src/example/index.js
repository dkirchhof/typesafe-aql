"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const UserCollection_1 = require("./UserCollection");
const util_1 = require("util");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
(async () => {
    // userCollection.createQuery("u").return(u => ({ firstname: u.firstname, lastname: u.lastname, age: u.age })).toAQL(),
    const query = UserCollection_1.userCollection.createQuery("u")
        .return(u => ({
        firstname: u.firstname,
        lastname: u.lastname,
        age: u.age,
        courses: u.courses.createQuery("c")
            .return(c => ({
            teachersFirstname: u.firstname,
            name: c.name,
        })),
    }));
    console.log(query.toAQL(true));
    const result = await query.fetch(db);
    console.log(util_1.inspect(result, false, null));
})();
