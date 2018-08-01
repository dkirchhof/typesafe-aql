"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../../collectionMetadata/Field");
const DocumentCollection_1 = require("../../collections/DocumentCollection");
const Edge_1 = require("../../collectionMetadata/Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const UserCollection_1 = require("./UserCollection");
const collectionDecorators_1 = require("../../decorators/collectionDecorators");
let CourseCollection = class CourseCollection extends DocumentCollection_1.DocumentCollection {
    constructor() {
        super(...arguments);
        this.title = new Field_1.Field();
        this.taughtBy = new Edge_1.Edge("INBOUND", () => TeachesEdgeCollection_1.TeachesEdgeCollection, () => UserCollection_1.UserCollection);
    }
};
CourseCollection = __decorate([
    collectionDecorators_1.DocumentCollectionDescriptor("courses")
], CourseCollection);
exports.CourseCollection = CourseCollection;
