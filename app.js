const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;
// const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//     User.findById("6673e956a8e1ea89e43e5818")
//         .then((user) => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch((error) => console.log(error));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//     app.listen(3000);
// });
mongoose
    .connect(
        "mongodb+srv://oana:Mitricoiu01@cluster0.4esbfu7.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((result) => {
        app.listen(3000);
        console.log("mongooose connected");
    })
    .catch((error) => console.log(error));
