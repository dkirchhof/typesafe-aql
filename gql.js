class Field {

}

class Edge {

}

class Course {
    constructor() {
        this.id = new Field(); 
        this.title = new Field();
        this.location = new Field();
        this.teacher = new Edge(User);
    }
}

class User {
    constructor() {
        this.firstname = new Field();
    }
}

const query = `
    courses {
        id
        title
        location {
            name
        }
        teacher {
            firstname
        }
    }
`;

const resolver = {
    type: Course,
    fields: [
        "id",
        "title",
    ],
}

console.log(resolver);