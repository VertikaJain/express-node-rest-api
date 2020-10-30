const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000

const comics = [
    { id: "1", name: "Archies" },
    { id: "2", name: "Champak" },
    { id: "3", name: "Batman" },
    { id: "4", name: "Tinkle" },
    { id: "5", name: "Goosbumps" }
]

app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// GET All Comics
app.get("/comics", (req, res) => {
    res.send(comics)
})

// GET Comic based on ID
app.get("/comics/:id", (req, res) => {
    let comic = comics.find(c => c.id == parseInt(req.params.id))
    if (!comic) res.status(404).send({ "error": "Comic not found." })
    else res.send(comic)
})

// POST Comic
app.post("/comics", (req, res) => {
    if (!req.body)
        res.status(400).send({ error: "Cannot Add Comics" })
    else {
        let newComic = { id: comics.length + 1, name: req.body.name }
        comics.push(newComic)
        res.send(comics)
    }

})

app.listen(PORT, () => console.log(`Connected to ${PORT}`))