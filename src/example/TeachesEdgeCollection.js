"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EdgeCollection_1 = require("../collections/EdgeCollection");
const collectionDecorators_1 = require("../decorators/collectionDecorators");
let TeachesEdgeCollection = class TeachesEdgeCollection extends EdgeCollection_1.EdgeCollection {
};
TeachesEdgeCollection = __decorate([
    collectionDecorators_1.EdgeCollectionDescriptor("teaches")
], TeachesEdgeCollection);
exports.TeachesEdgeCollection = TeachesEdgeCollection;
