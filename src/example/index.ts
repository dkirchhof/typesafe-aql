import { Database } from "arangojs";
import { userCollection } from "./UserCollection";
import { inspect } from "util";

const dbServer = new Database();
const db = dbServer.useDatabase("test");

(async () => {

    const query = userCollection.createQuery("u")
        .return(u => ({ 
            id: u._id,
            firstname: u.firstname,
            lastname: u.lastname,
            age: u.age,

            // courses: u.courses.createQuery("c")
            //     .return(c => ({ 
            //         teachersFirstname: u.firstname,
            //         name: c.name,
            //         teacher: c.teacher.createQuery("t")
            //             .return(t => ({ 
            //                 firstname: t.firstname 
            //             }))
            //     })),
        }));
    
    console.log(query.toAQL(true));

    const result = await query.fetch(db);
    console.log(inspect(result, false, null, true));

})();