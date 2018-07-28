"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../Field");
const Collection_1 = require("../Collection");
const Edge_1 = require("../Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const UserCollection_1 = require("./UserCollection");
class CourseCollection extends Collection_1.Collection {
    constructor() {
        super(...arguments);
        this.name = new Field_1.Field();
        this.teacher = new Edge_1.Edge("INBOUND", TeachesEdgeCollection_1.teachesEdgeCollection, UserCollection_1.userCollection);
    }
}
exports.CourseCollection = CourseCollection;
exports.courseCollection = new CourseCollection("courses");
