"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentCollection_1 = require("../collections/DocumentCollection");
const Field_1 = require("../collectionMetadata/Field");
const Edge_1 = require("../collectionMetadata/Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const CourseCollection_1 = require("./CourseCollection");
class UserCollection extends DocumentCollection_1.DocumentCollection {
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
