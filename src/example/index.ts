import { Database } from "arangojs";
import { inspect } from "util";
import { createUML } from "../utils/createUML";
import { arangoStore } from "../Store";
import { UserCollection } from "./UserCollection";
import { getMissingCollections, createMissingCollections } from "../utils/migration";
import { and } from "../queryBuilders/booleanOperators/and";
import { or } from "../queryBuilders/booleanOperators/or";
import { Predicate } from "../queryBuilders/Predicate";

const dbServer = new Database();
const db = dbServer.useDatabase("test");

runExample();

async function runExample() {
    // await migrationTest();
    await queryTest();
    // await umlTest();
}

async function queryTest() {
    const userCollection = arangoStore.getDocumentCollection(UserCollection);

    const query = userCollection.createQuery("u")
        .filter(u => new Predicate(u.firstname, "==", "1"))
        .filter(u => new Predicate(u.firstname, "==", u.lastname))
        // .filter(and("a", or("b", "c")))
        // .filter(or("d", "e"))
        .return(u => ({ 
            id: u._id,
            firstname: u.firstname,
            lastname: u.lastname,
            age: u.age,

            courses: u.teaches.createQuery("c")
                .filter(c => new Predicate(c.name, "==", u.firstname))
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
    const uml = createUML(arangoStore.allCollections);
    const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;
    console.log(url);
}

async function migrationTest() {
    const missingCollections = await getMissingCollections(db, arangoStore.allCollections);
    await createMissingCollections(db, missingCollections);
}