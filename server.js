var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res){
    fs.readFile("./db.json", 'utf8', (err, data) =>{
        if (err) throw err;
        notes = JSON.parse(data);
        return res.json(notes);
    });
});
app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
    console.log(newNote);
    fs.appendFile("db.json", newNote);
    res.json(newNote);
})

app.listen(PORT, function(){
    console.log(`ready to take notes on port ${PORT}`);
});