const {ScoreController} = require("./api");
const express = require('express')
const path = require('path')
const hbs = require('hbs')
var cors = require("cors");
const { KeyObject } = require("crypto");

const app = express()
const port = process.env.PORT || 3001;


// public static path
const staticFilesPath = path.join(__dirname, '../public')
app.use(express.static(staticFilesPath));

// Views folder path
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.urlencoded({extended: true}));
app.use(cors());

// Set Template Engine
app.set('view engine', 'hbs');

// Set Views path
app.set('views', viewsPath);

// Register Partials Folder
hbs.registerPartials(partialsPath);

// routes
app.get('/', async(req, res) => {
  res.set("Connection", "keep-alive")
  res.set("Cache-Control", "no-cache")
  res.set("Access-Control-Allow-Origin", "*")
  
  if(Object.keys(ScoreController).length > 0){
    res.render('index.hbs', {score_details : ScoreController})
  }
})

app.get('/about', (req, res) => {
  res.render('about')
})


app.get('*/:val', (req, res) => {
  res.render('404', {
    errMsg: `Opps! '${req.params.val}' Page Not Found!`
  })
})


app.listen(port, () => {
  console.log(`Server running on port:${port}!`)
})






