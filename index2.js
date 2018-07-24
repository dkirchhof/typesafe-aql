"use strict";
// import { Database } from "arangojs";
// const dbServer = new Database();
// const db = dbServer.useDatabase("test");
// interface IUser {
//     firstname: string;
//     lastname: string;
//     age: number;
//     // relations: {
//     //     courses: ICourse;
//     // }
//     // ccourses: Relation<ICourse>;
// }
// interface ICourse {
//     name: string;
// }
// type Entity<Type> = { [s in keyof Type]: Field<Type[s]>; };
// type Diff<T, U> = T extends U ? never : T;
// // type NonNullable<T> = Diff<T, null | undefined>;
// function f<Model>(schema: { [s in keyof Model]?: boolean }) {
//     // return {} as Pick<Model, Extract<keyof Model, keyof typeof schema>>;
//     // return {} as Pick<Model, NonNullable<keyof typeof schema>>;
//     return {} as Model;
// }
// f<IUser>({ age: true, lastname: true }).
