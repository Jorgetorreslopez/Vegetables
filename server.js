require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const port = process.env.port || 3000
const Vegetable = require('./models/vegetables')

const app = express()

app.use(express.urlencoded({extended: true}))

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