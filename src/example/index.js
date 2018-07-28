"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const UserCollection_1 = require("./UserCollection");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
(async () => {
    const query = UserCollection_1.userCollection.createQuery("u")
        .return(u => ({
        id: u._id,
        firstname: u.firstname,
        lastname: u.lastname,
        age: u.age,
        courses: u.teaches.createQuery("t")
            .return(v => ({
            name: v.name,
            teacher: v.taughtBy.createQuery("t2")
                .return(t => ({
                firstname: t.firstname
            }))
        })),
    }));
    console.log(query.toAQL(true));
    // const result = await query.fetch(db);
    // result[0].courses[0].teacher[0].firstname
    // console.log(inspect(result, false, null, true));
})();
