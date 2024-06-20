const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://oana:Mitricoiu01@cluster0.4esbfu7.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
    )
        .then((client) => {
            console.log("Mongodb connected!!!YEYYYY!!!");
            _db = client.db();
            callback();
        })
        .catch((error) => {
            console.log(error);
            throw error;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
