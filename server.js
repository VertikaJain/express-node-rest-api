const Joi = require("joi");
const express = require("express")
const app = express()

const PORT = process.env.PORT || 5000

let comics = [
    { id: "1", name: "Archies" },
    { id: "2", name: "Champak" },
    { id: "3", name: "Batman" },
    { id: "4", name: "Tinkle" },
    { id: "5", name: "Goosbumps" }
]

app.use(express.json())

// GET All Comics
app.get("/comics", (req, res) => {
    res.status(200).send(comics)
})

// GET Comic based on ID
app.get("/comics/:id", (req, res) => {
    let comic = comics.find(c => c.id == parseInt(req.params.id))
    if (!comic) return res.status(404).send({ "error": "Comic not found." })
    res.status(200).send(comic)
})

// POST Comic
app.post("/comics", (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error)
        return res.status(400).send({ error: result.error.details[0].message })

    let newComic = { id: comics.length + 1, name: req.body.name }
    comics.push(newComic)
    res.status(201).send(comics)
})

// PUT method to update Resources -> Comics
app.put("/comics/:id", (req, res) => {
    // Search
    let comic = comics.find(c => c.id == parseInt(req.params.id))
    if (!comic) return res.status(404).send({ "error": "Comic not found." })
    // Validate
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const result = schema.validate(req.body);
    if (result.error)
        return res.status(400).send({ error: result.error.details[0].message })
    // Return
    comics = comics.map(c => {
        if (c.id == req.params.id)
            c.name = req.body.name
        return c
    })
    res.status(200).send(comics)
})

// DELETE comic
app.delete("/comics/:id", (req, res) => {
    // Search
    let comic = comics.find(c => c.id == parseInt(req.params.id))
    if (!comic) return res.status(404).send({ "error": "Comic not found." })
    // Delete & Return
    comics = comics.filter(c => c.id != comic.id)
    res.send(comics)

})

app.listen(PORT, () => console.log(`Connected to ${PORT}`))