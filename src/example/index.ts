import { userCollection } from "./UserCollection";

(async () => {

    // userCollection.createQuery("u").return(u => ({ firstname: u.firstname, lastname: u.lastname, age: u.age })).toAQL(),

    console.log(
        userCollection.createQuery("u")
            .return(u => ({ 
                firstname: u.firstname,
                lastname: u.lastname,
                age: u.age,

                courses: u.courses.createQuery("c")
                    .return(c => ({ 
                        teachersFirstname: u.firstname,
                        name: c.name,
                        teacher: c.teacher.createQuery("t")
                            .return(t => ({ 
                                firstname: t.firstname 
                            }))
                    })),
            }))
            .toAQL(true),
    );

})();