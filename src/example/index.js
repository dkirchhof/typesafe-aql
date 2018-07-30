"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const util_1 = require("util");
const createUML_1 = require("../utils/createUML");
const Store_1 = require("../Store");
const UserCollection_1 = require("./UserCollection");
const migration_1 = require("../utils/migration");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
runExample();
async function runExample() {
    await migrationTest();
    // await queryTest();
    // await umlTest();
}
async function queryTest() {
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
    console.log(util_1.inspect(result, false, null, true));
}
async function umlTest() {
    const uml = createUML_1.createUML(Store_1.arangoStore.allCollections);
    const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;
    console.log(url);
}
async function migrationTest() {
    console.log(Store_1.arangoStore.allCollections.map(col => col._collectionName));
    const missingCollections = await migration_1.getMissingCollections(db, Store_1.arangoStore.allCollections);
    await migration_1.createMissingCollections(db, missingCollections);
}
