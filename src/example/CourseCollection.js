"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../collectionMetadata/Field");
const DocumentCollection_1 = require("../collections/DocumentCollection");
const Edge_1 = require("../collectionMetadata/Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const UserCollection_1 = require("./UserCollection");
class CourseCollection extends DocumentCollection_1.DocumentCollection {
    constructor() {
        super(...arguments);
        this.name = new Field_1.Field();
        this.taughtBy = new Edge_1.Edge("INBOUND", TeachesEdgeCollection_1.TeachesEdgeCollection, UserCollection_1.UserCollection);
    }
}
exports.CourseCollection = CourseCollection;
exports.courseCollection = new CourseCollection("courses");
