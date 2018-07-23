"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arangojs_1 = require("arangojs");
const dbServer = new arangojs_1.Database();
const db = dbServer.useDatabase("test");
class Collection {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async getMany(options) {
        const mappedFields = options.fields ? options.fields.map(field => `${field.toString()}: root.${field.toString()}`) : [];
        const mappedRelations = this.mapRelations("root", options.relations);
        const allFields = [
            ...mappedFields,
            ...mappedRelations,
        ];
        const query = `
            FOR root IN ${this.tableName}
            RETURN {
                ${allFields.join(",\n")}
            }
        `;
        console.log(query);
        const result = await db.query(query);
        return result.all();
        // return result.all() as Promise<Pick<Model, keyof typeof options.fields>[]>;
    }
    mapRelations(parent, relations) {
        if (!relations) {
            return [];
        }
        return Object.entries(relations).map(([key, value]) => {
            const mappedFields = value.fields ? value.fields.map(field => `${field.toString()}: t.${field.toString()}`) : [];
            return `
                ${key}: (
                    FOR t IN 1 OUTBOUND ${parent} ${key}
                    RETURN {
                        ${mappedFields.join(",\n")}
                    }
                )
            `;
        });
    }
    async getOne(key) {
        return db.collection(this.tableName).document(key);
    }
}
class User {
    constructor() {
        this.firstname = "";
        this.lastname = "";
        this.teaches = [];
    }
}
class Course {
    constructor() {
        this.name = "";
        this.hasCategory = { name: "" };
    }
}
class Category {
    constructor() {
        this.name = "";
    }
}
(async () => {
    const userCollection = new Collection("users");
    const users = await userCollection.getMany({
        fields: ["firstname"],
        relations: {
            teaches: {
                fields: ["name", "hasCategory"],
                relations: {
                    hasCategory: {
                        fields: ["name"]
                    }
                }
            }
        }
    });
    console.log(users);
    // const user = await userCollection.getOne("265");
    // console.log(user);
})();
