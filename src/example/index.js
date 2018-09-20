"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const createUML_1 = require("../utils/createUML");
const Store_1 = require("../Store");
const UserCollection_1 = require("./collections/UserCollection");
const migration_1 = require("../utils/migration");
const Predicate_1 = require("../queries/Predicate");
const BooleanOperator_1 = require("../queries/BooleanOperator");
const TeachesEdgeCollection_1 = require("./collections/TeachesEdgeCollection");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
runExample();
async function runExample() {
    // await migrationTest();
    await queryTest();
    // await umlTest();
}
async function queryTest() {
    const userCollection = Store_1.arangoStore.getCollection(UserCollection_1.UserCollection);
    const query = userCollection.createQuery("u")
        .filter(u => new Predicate_1.Predicate(u.age, ">=", 18))
        .filter(u => BooleanOperator_1.or(new Predicate_1.Predicate(u.firstname, "==", u.lastname), new Predicate_1.Predicate(u.age, ">=", 100)))
        .return(u => ({
        id: u._id,
        firstname: u.firstname,
        lastname: u.lastname,
        age: u.age,
        courses: u.teaches.createQuery("c")
            .filter(c => new Predicate_1.Predicate(c.title, "==", u.firstname))
            .return(c => ({
            title: c.title,
            teacher: c.taughtBy.createQuery("t2")
                .return(t => ({
                firstname: t.firstname
            }))
        })),
    }));
    console.log(query.toAQL(true));
    // const result = await query.fetch(db); result[0].courses[0].teacher[0].firstname
    // // console.log(inspect(result, false, null, true));
    // const query2 = userCollection.createQuery("u1")
    //     .return(u1 => ({
    //         name: u1.firstname,
    //         others: userCollection.createQuery("u2")
    //             .return(u2 => ({
    //                 name: u2.firstname
    //             }))
    //     }));
    // console.log(query2.toAQL(true));
    // const user = await userCollection.getOne(db, "62369");
    // console.log(user);
    // const user2 = await userCollection.getOne(db, "???");
    // console.log(user2);
    // const allUsers = await userCollection.getAll(db);
    // console.log(allUsers);
    // const many = await userCollection.getMany(db, ["62369", "70888__"]);
    // console.log(many);
    // const courseCollection = arangoStore.getCollection(CourseCollection);
    // const query3 = courseCollection.createQuery("c").returnAll();
    // console.log(query3.toAQL(true));
    // console.log((await query3.fetch(db))[0]);
    const teachesCollection = Store_1.arangoStore.getCollection(TeachesEdgeCollection_1.TeachesEdgeCollection);
    const query4 = teachesCollection.createQuery("t").return(t => ({
        f: t._from,
        t: t._to
    }));
    console.log(query4.toAQL(true));
    console.log((await query4.fetch(db)));
    console.log((await teachesCollection.getAll(db)));
}
async function umlTest() {
    const uml = createUML_1.createUML(Store_1.arangoStore.allCollections);
    const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;
    console.log(url);
}
async function migrationTest() {
    const missingCollections = await migration_1.getMissingCollections(db, Store_1.arangoStore.allCollections);
    await migration_1.createMissingCollections(db, missingCollections);
}
