"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../Field");
const Collection_1 = require("../Collection");
const Relation_1 = require("../Relation");
const UserCollection_1 = require("./UserCollection");
class CourseCollection extends Collection_1.Collection {
    constructor() {
        super(...arguments);
        this.name = new Field_1.Field();
        this.teacher = new Relation_1.Relation("INBOUND", "teaches", UserCollection_1.UserCollection);
    }
}
exports.CourseCollection = CourseCollection;
exports.courseCollection = new CourseCollection("courses");
