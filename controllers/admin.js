const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add product",
        path: "/admin/add-product",
        editing: false,
    });
};

const postAddProduct = (req, res, next) => {
    const { title, price, description, imageUrl } = req.body;
    const product = new Product({
        title,
        price,
        description,
        imageUrl,
        userId: req.user,
    });
    product
        .save()
        .then((result) => {
            console.log("Created product");
            res.redirect("/admin/products");
        })
        .catch((error) => console.log(error));
};

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then((product) => {
            if (!product) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "Edit product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
            });
        })
        .catch((error) => console.log(error));
};

const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedImageUrl = req.body.imageUrl;

    Product.findById(prodId)
        .then((product) => {
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save();
        })
        .then((result) => {
            console.log("Updated product");
            res.redirect("/admin/products");
        })
        .catch((error) => console.log(error));
};

const getProducts = (req, res, next) => {
    Product.find()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
            });
        })
        .catch((error) => console.log(error));
};

const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.findByIdAndDelete(prodId)
        .then(() => {
            console.log("Destroyed product");

            res.redirect("/admin/products");
        })
        .catch((error) => console.log(error));
};

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts,
    getEditProduct,
    postEditProduct,
    postDeleteProduct,
};
