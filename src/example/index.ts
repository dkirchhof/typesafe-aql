import { Database } from "arangojs";
import { inspect } from "util";
import { createUML } from "../utils/createUML";
import { arangoStore } from "../Store";
import { UserCollection } from "./UserCollection";
import { getMissingCollections, createMissingCollections } from "../utils/migration";
import { Predicate } from "../queryBuilders/Predicate";
import { or } from "../queryBuilders/BooleanOperator";

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
        .filter(u => new Predicate(u.age, ">=", 18))
        .filter(u => or(
            new Predicate(u.firstname, "==", u.lastname), 
            new Predicate(u.age, ">=", 100)
        ))
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

    const query2 = userCollection.createQuery("u1")
        .return(u1 => ({
            name: u1.firstname,
            others: userCollection.createQuery("u2")
                .return(u2 => ({
                    name: u2.firstname
                }))
        }));

    console.log(query2.toAQL(true));

    // const result = await query.fetch(db); result[0].courses[0].teacher[0].firstname<Schema>
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