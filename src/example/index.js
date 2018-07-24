"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserCollection_1 = require("./UserCollection");
(async () => {
    // userCollection.createQuery("u").return(u => ({ firstname: u.firstname, lastname: u.lastname, age: u.age })).toAQL(),
    console.log(UserCollection_1.userCollection.createQuery("u")
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
        .toAQL(true));
})();
