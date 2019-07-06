const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

//define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static( publicDirectorypath))
//providing link to all data to be used

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Puneet'
    })
})
//using hbs views to make dynamic webpages, not static

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ME!',
        name: 'Puneet'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'You need help?',
        title: 'Help',
        name: 'Puneet'
       })
})

app.get('/weather',(req,res)=>{ 
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    }
    geocode(req.query.address,(error,{ latitude, longitude, location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude,(error,fcdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: fcdata,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.type) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title: '404',
        error: 'Help article not available', 
        name: 'PRISON MIKE'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        error: 'This page is not available', 
        name: 'PRISON MIKE' 
    })
})

app.listen(3000,()=>{
    console.log('server started on port 3000')
})