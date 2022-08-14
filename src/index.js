import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import { UserModel, verifyUser, verifyEmailAndPassword, getUser, updateContact, deleteContact, getContactLike } from "./database/module.js";

const port = process.env.PORT || 6500;

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const views = path.join(__dirname, "../views");
const assetsDirectory = path.join(__dirname, "../views/assets");
const images = path.join(__dirname, "../views/assets/images");

const app = express();

// setting middlewares
app.use(favicon(path.join(__dirname, "../views", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(assetsDirectory));
app.use(express.static(images));


app.set("view engine", "pug");
app.set("views", views);

app.get("/", (req, res) => {
    if(req.cookies.email != undefined)
        res.redirect("/view-all-contacts");
    else
    {
        res.render("index");
    }
});

app.get("/create-contact", (req, res) => {
    if (req.cookies.email == undefined)
        res.redirect("/sign-up");
    else
        res.render("create-contact");
})
app.get("/view-all-contacts", async (req, res) => {
    try {
        if (req.cookies.email == undefined)
            res.redirect("/sign-up");
        else {
            const User = await getUser(req.cookies.email);
            if(User.contacts.length==0)
                res.render("index");
            else
            {
                res.render("view-all-contacts", {
                    contacts: User.contacts
                });
            }
        }
    } catch (error) {
        res.render("error", {
            message: {
                status: 500,
                msg: "Internal Server Error"
            }
        });
    }
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", (req, res) => {
    verifyUser(req.body.email).then((data) => {
        if (data == true) {
            res.render("sign-up", {
                message: "This email is already taken"
            });
        }
        else {
            const user = new UserModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                email: req.body.email,
                password: req.body.password,
                confirmPassword: req.body.confirmPassword
            });

            user.save();
            res.cookie("username", req.body.firstName, {maxAge : 1000*60*60*24*365});
            res.cookie("email", req.body.email, {maxAge : 1000*60*60*24*365});
            res.redirect("/create-contact");
        }
    }).catch((err) => {
        res.send(err);
    });
});

app.post("/login-user", (req, res) => {
    verifyEmailAndPassword(req.body.email, req.body.password).then((data) => {
        if (data != false) {
            res.cookie("username", data, {maxAge : 1000*60*60*24*365});
            res.cookie("email", req.body.email, {maxAge : 1000*60*60*24*365});
            res.redirect("/");
        }
        else {
            res.render("login", { message: "Invalid email and password" });
        }
    }).catch((err) => {
        res.send(err);
    });
});

app.post("/create-contact", async (req, res) => {
    try {
        const result = await UserModel.updateOne({ email: req.cookies.email }, {
            $push: {
                "contacts": {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    company: req.body.company,
                    department: req.body.department,
                    title: req.body.title,
                    phone: req.body.phone,
                    mobile: req.body.mobile,
                    address: req.body.address,
                    website: req.body.website,
                    birthday: req.body.birthday,
                    relationship: req.body.relationship
                }
            }
        });
        await UserModel.updateOne({email : req.cookies.email}, {$push : {contacts : {$each :[], $sort : 1}}});
        if (result.modifiedCount == 0)
            res.render("error", {
                message: {
                    status: 502,
                    msg: "Bad Gateway"
                }
            });
        else
            res.redirect("/view-all-contacts");

    } catch (error) {
        res.send(error);
    }
});

app.get("/error", (req, res) => {
    res.render("error", {
        message: {
            status: 502,
            msg: "Bad Gateway"
        }
    });
});

app.get("/edit-contacts", (req, res) => {
    const email = req.cookies.email;
    const name = req.cookies.editname;
    getUser(email).then((data) => {
        data.contacts.forEach((element) => {
            if (element.firstName == name) {
                res.render("edit-contacts", {
                    contact: element
                });
            }
        });

    }).catch((error) => {
        res.send(error);
    });
});


app.post("/update-contact", (req, res) => {

    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        company: req.body.company,
        department: req.body.department,
        title: req.body.title,
        phone: req.body.phone,
        mobile: req.body.mobile,
        address: req.body.address,
        website: req.body.website,
        birthday: req.body.birthday,
        relationship: req.body.relationship
    }
    updateContact(contact, req.cookies.username);
    res.clearCookie("editname");
    setTimeout(() => {
        res.redirect("/view-all-contacts");
    }, 2000);
});

app.get("/delete-contacts", (req, res) => {
    deleteContact(req.cookies.username, req.cookies.deletename);
    res.clearCookie("deletename");
    setTimeout(() => {
        res.redirect("/view-all-contacts");
    }, 2000);
});

app.get("/profile", (req, res) => {
    res.render("profile", { username: req.cookies.username });
});

app.get("/logout", (req, res) => {
    res.clearCookie("username");
    res.clearCookie("email");
    res.clearCookie("editname");
    res.redirect("/");
});


app.get("/search-contact", (req,res)=>{
    getContactLike(req.cookies.username, req.query.name).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    });
});

app.listen(port);

