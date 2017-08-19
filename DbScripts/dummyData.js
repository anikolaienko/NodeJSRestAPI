var conn = new Mongo('127.0.0.1:27017');
var db = conn.getDB('booksapi_test');

db.books.insertMany([{
    title: "The Harry Potter series",
    author: "J.K. Rowling",
    genre: "Fiction",
    read: true
},{
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    genre: "Fiction",
    read: true
}, {
    title: "When Breath Becomes Air",
    author: "Paul Kalanithi",
    genre: "Nonfiction",
    read: false
}, {
    title: "Into Thin Air: A Personal Account of the Mt. Everest Disaster",
    author: "Jon Krakauer",
    genre: "Nonfiction",
    read: false
}]);