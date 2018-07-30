"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserCollection_1 = require("./UserCollection");
const Store_1 = require("../Store");
// const dbServer = new Database();
// const db = dbServer.useDatabase("test");
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
    console.log(Store_1.arangoStore.documentCollections);
    console.log(Store_1.arangoStore.edgeCollections);
    // const uml = createUML([UserCollection, CourseCollection, TeachesEdgeCollection]);
    // const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;
    // console.log(url);
})();
