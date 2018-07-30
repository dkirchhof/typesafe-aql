import { Database } from "arangojs";
import { userCollection, UserCollection } from "./UserCollection";
import { inspect } from "util";
import { createUML } from "../utils/createUML";
import { CourseCollection } from "./CourseCollection";
import { TeachesEdgeCollection } from "./TeachesEdgeCollection";
import { arangoStore } from "../Store";

// const dbServer = new Database();
// const db = dbServer.useDatabase("test");

(async () => {

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

    // const result = await query.fetch(db);
    // result[0].courses[0].teacher[0].firstname
    // console.log(inspect(result, false, null, true));
    
    console.log(arangoStore.documentCollections);
    console.log(arangoStore.edgeCollections);

    const uml = createUML([UserCollection, CourseCollection, TeachesEdgeCollection]);
    const url = `https://g.gravizo.com/svg?${encodeURI(uml)}`;

    console.log(url);

})();