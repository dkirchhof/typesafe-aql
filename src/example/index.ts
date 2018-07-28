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

})();