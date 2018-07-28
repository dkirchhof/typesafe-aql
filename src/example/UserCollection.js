"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = require("../Collection");
const Field_1 = require("../Field");
const Edge_1 = require("../Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const CourseCollection_1 = require("./CourseCollection");
class UserCollection extends Collection_1.Collection {
    constructor() {
        super(...arguments);
        this.firstname = new Field_1.Field();
        this.lastname = new Field_1.Field();
        this.age = new Field_1.Field();
        this.teaches = new Edge_1.Edge("OUTBOUND", TeachesEdgeCollection_1.TeachesEdgeCollection, CourseCollection_1.CourseCollection);
    }
}
exports.UserCollection = UserCollection;
exports.userCollection = new UserCollection("users");
