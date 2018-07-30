"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("../collectionMetadata/Field");
function createProxy(collection, variable) {
    return new Proxy(collection, {
        get: (target, key) => {
            if (target[key] instanceof Field_1.Field) {
                return `${variable}.${key.toString()}`;
            }
            return target[key];
        }
    });
}
exports.createProxy = createProxy;
