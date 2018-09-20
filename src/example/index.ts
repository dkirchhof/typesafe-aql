import { Database } from "arangojs";
import { createUML } from "../utils/createUML";
import { arangoStore } from "../Store";
import { UserCollection } from "./collections/UserCollection";
import { getMissingCollections, createMissingCollections } from "../utils/migration";
import { Predicate } from "../queryBuilders/Predicate";
import { or } from "../queryBuilders/BooleanOperator";
import { CourseCollection } from "./collections/CourseCollection";

const dbServer = new Database();
const db = dbServer.useDatabase("test");

runExample();

async function runExample() {
    // await migrationTest();
    await queryTest();
    // await umlTest();
}

async function queryTest() {
    const userCollection = arangoStore.getCollection(UserCollection);

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
                .filter(c => new Predicate(c.title, "==", u.firstname))
                .return(c => ({
                    title: c.title,
                    teacher: c.taughtBy.createQuery("t2")
                        .return(t => ({ 
                            firstname: t.firstname 
                        }))
                })),
        }));
    
    console.log(query.toAQL(true));
    // const result = await query.fetch(db); result[0].courses[0].teacher[0].firstname<Schema>
    // console.log(inspect(result, false, null, true));

    const query2 = userCollection.createQuery("u1")
        .return(u1 => ({
            name: u1.firstname,
            others: userCollection.createQuery("u2")
                .return(u2 => ({
                    name: u2.firstname
                }))
        }));

    console.log(query2.toAQL(true));

    const user = await userCollection.getOne(db, "62369");
    console.log(user);
    
    const user2 = await userCollection.getOne(db, "???");
    console.log(user2);

    const allUsers = await userCollection.getAll(db);
    console.log(allUsers);

    const many = await userCollection.getMany(db, ["62369", "70888__"]);
    console.log(many);

    // graphql
    // courses {
    //     id
    //     title
    //     location {
    //         name
    //     }
    //     teacher {
    //         firstname
    //     }
    // }
    
    // aql
    // FOR c IN courses
    // RETURN { 
    //     id: c._id,
    //     title: c.title, 
    //     location: { 
    //         name: c.location.name 
    //     },
    //     teacher: FIRST(
    //         FOR t IN 1 INBOUND c teaches 
    //         RETURN {
    //             firstname: t.firstname
    //         }
    //     )
    // }

    const courseCollection = arangoStore.getCollection(CourseCollection);
    const query3 = courseCollection.createQuery("c").returnAll();
    
    console.log(query3.toAQL(true));
    // console.log((await query3.fetch(db))[0]);
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
