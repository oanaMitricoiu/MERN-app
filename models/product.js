const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require("mongodb");
// const getDb = require("../util/database").getDb;

// class Product {
//     constructor(title, price, description, imageUrl, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             dbOp = db
//                 .collection("products")
//                 .updateOne({ _id: this._id }, { $set: this });
//         } else {
//             dbOp = db.collection("products").insertOne(this);
//         }
//         return dbOp
//             .then((result) => console.log(result))
//             .catch((error) => console.log(error));
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection("products")
//             .find()
//             .toArray()
//             .then((products) => {
//                 console.log(products);
//                 return products;
//             })
//             .catch((error) => console.log(error));
//     }

//     static findById(prodId) {
//         const db = getDb();

//         return db
//             .collection("products")
//             .find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then((product) => {
//                 console.log(product);
//                 return product;
//             })
//             .catch((error) => console.log(error));
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         const _id = new mongodb.ObjectId(prodId);
//         return db
//             .collection("products")
//             .deleteOne({
//                 _id: _id,
//             })
//             .then((result) => console.log("Deleted"))
//             .catch((error) => console.log(error));
//     }
// }

// module.exports = Product;

// // const fs = require("fs");
// // const path = require("path");
// // const Cart = require("./cart");

// // const p = path.join(
// //     path.dirname(process.mainModule.filename),
// //     "data",
// //     "products.json"
// // );

// // const getProductsFromFile = (cb) => {
// //     fs.readFile(p, (error, fileContent) => {
// //         if (error) {
// //             return cb([]);
// //         }

// //         cb(JSON.parse(fileContent));
// //     });
// // };

// // module.exports = class Product {
// //     constructor(id, title, imageUrl, description, price) {
// //         this.id = id;
// //         this.title = title;
// //         this.imageUrl = imageUrl;
// //         this.description = description;
// //         this.price = price;
// //     }

// //     save() {
// //         getProductsFromFile((products) => {
// //             if (this.id) {
// //                 const existingProductIndex = products.findIndex(
// //                     (prod) => prod.id === this.id
// //                 );
// //                 const updatedProducts = [...products];
// //                 updatedProducts[existingProductIndex] = this;
// //                 fs.writeFile(p, JSON.stringify(updatedProducts), (error) => {
// //                     console.log(error);
// //                 });
// //             } else {
// //                 this.id = Math.random().toString();
// //                 products.push(this);
// //                 fs.writeFile(p, JSON.stringify(products), (error) => {
// //                     console.log(error);
// //                 });
// //             }
// //         });
// //     }

// //     static deleteById(id) {
// //         getProductsFromFile((products) => {
// //             // console.log(products);
// //             const product = products.find((prod) => prod.id === id);
// //             console.log(product);
// //             const updatedProducts = products.filter((prod) => prod.id !== id);
// //             fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
// //                 if (!err && product) {
// //                     Cart.deleteProduct(id, product.price);
// //                 }
// //             });
// //         });
// //     }

// //     static fetchAll(cb) {
// //         getProductsFromFile(cb);
// //     }

// //     static findById(id, cb) {
// //         getProductsFromFile((products) => {
// //             const product = products.find((p) => p.id === id);
// //             cb(product);
// //         });
// //     }
// // };
