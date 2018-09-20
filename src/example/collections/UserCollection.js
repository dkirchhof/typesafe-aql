"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocumentCollection_1 = require("../../collections/DocumentCollection");
const Edge_1 = require("../../collectionMetadata/Edge");
const TeachesEdgeCollection_1 = require("./TeachesEdgeCollection");
const CourseCollection_1 = require("./CourseCollection");
const collectionDecorators_1 = require("../../decorators/collectionDecorators");
const fieldDecorators_1 = require("../../decorators/fieldDecorators");
let UserCollection = class UserCollection extends DocumentCollection_1.DocumentCollection {
    constructor() {
        super(...arguments);
        this.teaches = new Edge_1.Edge("OUTBOUND", () => TeachesEdgeCollection_1.TeachesEdgeCollection, () => CourseCollection_1.CourseCollection);
    }
};
__decorate([
    fieldDecorators_1.FieldDescriptor()
], UserCollection.prototype, "firstname", void 0);
__decorate([
    fieldDecorators_1.FieldDescriptor()
], UserCollection.prototype, "lastname", void 0);
__decorate([
    fieldDecorators_1.FieldDescriptor()
], UserCollection.prototype, "age", void 0);
UserCollection = __decorate([
    collectionDecorators_1.CollectionDescriptor("users")
], UserCollection);
exports.UserCollection = UserCollection;
