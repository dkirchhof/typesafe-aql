"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
function FieldDescriptor() {
    return function (target, key) {
        const description = Store_1.arangoStore.getOrRegisterCollectionDescription(target.constructor);
        description.fields.push(key);
    };
}
exports.FieldDescriptor = FieldDescriptor;
