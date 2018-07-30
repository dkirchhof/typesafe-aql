import { Database } from "arangojs";
import { inspect } from "util";
import { createUML } from "../utils/createUML";
import { arangoStore } from "../Store";
import { UserCollection } from "./UserCollection";
import { getMissingCollections, createMissingCollections } from "../utils/migration";

const dbServer = new Database();
const db = dbServer.useDatabase("test");

runExample();

async function runExample() {
    // await migrationTest();
    // await queryTest();
    // await umlTest();
}

async function queryTest() {
    const userCollection = arangoStore.getDocumentCollection(UserCollection);

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
    console.log(inspect(result, false, null, true));
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