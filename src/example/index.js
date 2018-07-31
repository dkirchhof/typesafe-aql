"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const createUML_1 = require("../utils/createUML");
const Store_1 = require("../Store");
const UserCollection_1 = require("./UserCollection");
const migration_1 = require("../utils/migration");
const Predicate_1 = require("../queryBuilders/Predicate");
const BooleanOperator_1 = require("../queryBuilders/BooleanOperator");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
runExample();
async function runExample() {
    // await migrationTest();
    await queryTest();
    // await umlTest();
}
async function queryTest() {
    const userCollection = Store_1.arangoStore.getDocumentCollection(UserCollection_1.UserCollection);
    const query = userCollection.createQuery("u")
        .filter(u => new Predicate_1.Predicate(u.age, ">=", 18))
        .filter(u => BooleanOperator_1.or(new Predicate_1.Predicate(u.firstname, "==", u.lastname), new Predicate_1.Predicate(u.age, ">=", 100)))
        .return(u => ({
        id: u._id,
        firstname: u.firstname,
        lastname: u.lastname,
        age: u.age,
        courses: u.teaches.createQuery("c")
            .filter(c => new Predicate_1.Predicate(c.name, "==", u.firstname))
            .return(c => ({
            name: c.name,
            teacher: c.taughtBy.createQuery("t2")
                .return(t => ({
                firstname: t.firstname
            }))
        })),
    }));
    console.log(query.toAQL(true));
    // const result = await query.fetch(db);
    // console.log(inspect(result, false, null, true));
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
