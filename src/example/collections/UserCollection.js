"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const collections_1 = require("../../collections");
const collectionMetadata_1 = require("../../collectionMetadata");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const CourseCollection_1 = require("./CourseCollection");
const decorators_1 = require("../../decorators");
let UserCollection = class UserCollection extends collections_1.Collection {
    constructor() {
        super(...arguments);
        this.firstname = new collectionMetadata_1.Field();
        this.lastname = new collectionMetadata_1.Field();
        this.age = new collectionMetadata_1.Field();
        this.teaches = new collectionMetadata_1.Edge("OUTBOUND", () => TeachesEdgeCollection_1.TeachesEdgeCollection, () => CourseCollection_1.CourseCollection);
    }
};
UserCollection = __decorate([
    decorators_1.CollectionDescriptor("users")
], UserCollection);
exports.UserCollection = UserCollection;
