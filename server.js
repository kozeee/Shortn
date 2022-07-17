const express = require('express')
const mongoose = require('mongoose')
const Shortn = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/Shortn')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/', async (req,res)=>{
    const urls = await Shortn.find()
    res.render('index', {url: urls})
})

app.post('/shortUrls', async (req,res)=>{
    await Shortn.create({full: req.body.fullUrl, name:req.body.urlName})
    res.redirect('/')
})

app.get('/:url', async (req,res)=>{
    const redir = await Shortn.findOne({short: req.params.url})
    if (redir == null) return res.sendStatus(404)
    redir.redirects++
    redir.save()
    res.redirect(redir.full)
})

app.listen(5000)