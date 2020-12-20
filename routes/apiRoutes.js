// Dependencies
var fs = require("fs");

// Routing
module.exports = function(app) {
    var notes;

   app.get("/api/notes", function(req, res) {
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            res.json(JSON.parse(data))
        })
    });

    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            notes.push(newNote);
            notes.forEach( function(item, i) {
                item.id = 1 + i;
            })
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if(err) throw err;
            })
        })
        res.json(newNote)
    });

        
// Delete Notes
    app.delete("/api/notes/:id" , function(req, res) {
        var deleteNote = req.params.id;

        fs.readFile("./db/db.json", function(err, data) {
            if (err) throw err;
            var notes = JSON.parse(data);
            notes.forEach(function(thisNote, i) {
                if (thisNote.id.toString() === deleteNote) {
                    notes.splice(i, 1)
                }
            })
            fs.writeFile("./db/db.json", JSON.stringify(notes), function(err) {
                if (err) throw err;
            })
        })
        res.send("file")
    })
}