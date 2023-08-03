

const express = require('express')
const app = express()

const port = process.env.PORT || 5000


const path = require("path")
const publicDirectory = path.join(__dirname, '../public')
app.use(express.static(publicDirectory))




app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, '../temp1/views')
app.set('views', viewsDirectory);

// to read partials : 
var hbs = require('hbs');
const partialsPath = path.join(__dirname, "../Temp1/partials")
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render('index', {
        title: "HOME",
        desc: "This is home page"
    })
})

app.get('/service', (req, res) => {
    res.render('service', {
        title: "SERVICE",
        name: "Mohamed",
        city: "Cairo",
        age: 40,
        img1: "images/trainer-3.jpg"
    })
})


app.get('/team', (req, res) => {
    res.render('team', {
        title: "TEAM",
        name: "reem",
        city: "mansoura",
        age: 25,
        img2: "images/trainer-2.jpg"
    })
})

// weather page
app.get('/weatherpage', (req, res) => {
    res.send(
        `
    <html>
        <head>
            <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Weather</title>
                    </head>
                    <body>
  <form id="form1">
            <input type="text" id="address">
            <button>Search</button>
        </form>
          <p id="location"></p>
          <p id="forecast"></p>
          <p id='latitude'></p>
          <p id='longitude'></p>

          <p id="error"></p>
           <script src="js/script.js"></script>
                    </body>
                </html>
    `
    )
})

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            // shorthand property error:error
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: req.query.address,
                latitude: data.latitude,
                longitude: data.longitude
            })
        })
    })
})


// Error handlening

app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})


// Port

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




