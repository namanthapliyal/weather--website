const geocode=require('./utils/geocode')
const forecast= require('./utils/forecast')
const path= require('path')
const express= require("express")
const hbs=require('hbs')
const app =  express()

// setting paths 
const dir=path.join(__dirname, '../public')
const viewspath=path.join(__dirname, '../templates/views')
const partialspath=path.join(__dirname, '../templates/partials')

//setting express and handlebars
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//static dir serving
app.use(express.static(dir))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Naman'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About ',
        name: 'Naman'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "HELP",
        name: 'Naman',
        message: 'This page is a help page...'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
            return res.send({
                error: 'Send address query..'
            })
    }
    
    //geocoding and forecasting
    geocode(req.query.address, (error, {lat, lon, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lat, lon,  (error, forecastdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastdata,
                location: location,
                Query: req.query.address
            })
          })
    } )
   
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Naman',
        errorMessage: 'Help article not found.'
    })
})


app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Naman',
        errorMessage: 'Page not found.'
    })
})
app.listen(3000, ()=>{
    console.log('server is running!')
})