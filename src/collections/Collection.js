"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
const fieldDecorators_1 = require("../decorators/fieldDecorators");
class Collection {
    get _collectionName() {
        return Store_1.arangoStore.getCollectionDescription(this.constructor).collectionName;
    }
}
__decorate([
    fieldDecorators_1.FieldDescriptor()
], Collection.prototype, "_id", void 0);
__decorate([
    fieldDecorators_1.FieldDescriptor()
], Collection.prototype, "_key", void 0);
__decorate([
    fieldDecorators_1.FieldDescriptor()
], Collection.prototype, "_rev", void 0);
exports.Collection = Collection;
