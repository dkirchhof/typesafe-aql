"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const util_1 = require("util");
const Store_1 = require("../Store");
const UserCollection_1 = require("./UserCollection");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
(async () => {
    const userCollection = Store_1.arangoStore.getDocumentCollection(UserCollection_1.UserCollection);
    const query = userCollection.createQuery("u")
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
    const result = await query.fetch(db);
    // result[0].courses[0].teacher[0].firstname
    console.log(util_1.inspect(result, false, null, true));
    // const uml = createUML(arangoStore.allCollections);
    // const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;
    // console.log(url);
    // const missingCollections = await getMissingCollections(db, arangoStore.allCollections);
    // await createMissingCollections(db, missingCollections);
})();
