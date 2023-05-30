require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const jsxEngine = require('jsx-view-engine')
const port = process.env.port || 3000
const Vegetable = require('./models/vegetables')

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('Da Mongo Mon!')
})

// I.N.D.U.C.E.S. //

// INDEX - A TABLE OF CONTENTS OF ALL YOUR RESOURCES

app.get('/vegetables', async (req, res) =>{
        try {
            const foundVegetables = await Vegetable.find({})
            res.render('vegetables/Index', {
                vegetables: foundVegetables
            })
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    })


// NEW
// show the user a form to fill out to create a fruit

app.get('/vegetables/new', (req,res) => {
    res.render('vegetables/New')
})

// Delete
app.delete('/vegetables/:id', async (req, res) => {
    try {
        await Vegetable.findOneAndDelete({'_id': req.params.id})
        .then(() => {
            res.redirect('/vegetables')
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Update
app.put('/vegetables/:id', async (req, res) =>{
    try {
        await Vegetable.findOneAndUpdate({ '_id': req.params.id },
            req.body, { new: true})
            .then(() => {
                res.redirect(`/vegetables/${req.params.id}`)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})


// CREATE
// backend only functionality that is used to create a fruit

app.post('/vegetables', async (req, res) => {
    try {
        const createdVegetable = await Vegetable.create(req.body)
        res.redirect(`/vegetables/${createdVegetable._id}`)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// Edit

app.get('/vegetables/:id/edit', async (req, res) => {
    try {
        const foundVegetable = await Vegetable.findOne({_id: req.params.id})
        res.render('vegetables/Edit', {
           vegetable: foundVegetable 
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// SHOW
// shows you 1 individual fruit

app.get('/vegetables/:id', async (req, res) =>{
    try {
        const foundVegetable = await Vegetable.findOne({_id: req.params.id})
        res.render('vegetables/Show', {
            vegetable: foundVegetable
        })
    } catch (error) {
        res.status(400).send({ message: error.message})
    }
})


app.listen(port, () => {
    console.log(`The Port is ${port}!! Porque!!`)
})