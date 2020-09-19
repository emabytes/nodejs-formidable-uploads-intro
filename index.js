const express = require("express");
const app = express();
const PORT = process.env.PORT || 3003;
const formidable = require("formidable")
const path = require("path");
const pathPictures = [];

//Serving static files
app.use(express.static("public"));
app.use(express.static("uploads"));

//Parsing Form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Templates engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index", { pathPictures: pathPictures });
});

//Post methods
app.post("/blogs/upload", (req, res, next) => {
    const form = formidable({ multiples: true, uploadDir: "./uploads", keepExtensions: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        console.log(path.basename(files.someExpressFiles.path));
        console.log(files.someExpressFiles.path);

        //if you want only one file at the same time
        pathPictures.push(path.basename(files.someExpressFiles.path));
        console.log(pathPictures);

        //if you want multiple files at the same time you need to use a loop

        // res.json({ fields, files });
        res.redirect("/");

    });
});

//Listening server
app.listen(PORT, () => {
    console.log("listening at 3003");
});