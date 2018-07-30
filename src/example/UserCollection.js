"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentCollection_1 = require("../collections/DocumentCollection");
const Field_1 = require("../collectionMetadata/Field");
const Edge_1 = require("../collectionMetadata/Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const CourseCollection_1 = require("./CourseCollection");
const collectionDecorators_1 = require("../decorators/collectionDecorators");
let UserCollection = class UserCollection extends DocumentCollection_1.DocumentCollection {
    constructor() {
        super(...arguments);
        this.firstname = new Field_1.Field();
        this.lastname = new Field_1.Field();
        this.age = new Field_1.Field();
        this.teaches = new Edge_1.Edge("OUTBOUND", TeachesEdgeCollection_1.TeachesEdgeCollection, CourseCollection_1.CourseCollection);
    }
};
UserCollection = __decorate([
    collectionDecorators_1.DocumentCollectionDescriptor("users")
], UserCollection);
exports.UserCollection = UserCollection;
exports.userCollection = new UserCollection("users");
