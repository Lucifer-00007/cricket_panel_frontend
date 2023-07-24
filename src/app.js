const { ScoreController, all_match_sites } = require("./api");
const express = require('express')
const path = require('path')
const hbs = require('hbs')
var cors = require("cors");

const app = express()
const port = process.env.PORT || 3002;


// public static path
const staticFilesPath = path.join(__dirname, '../public')
app.use(express.static(staticFilesPath));

// Views folder path
const viewsPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set Template Engine
app.set('view engine', 'hbs');

// Set Views path
app.set('views', viewsPath);

// Register Partials Folder
hbs.registerPartials(partialsPath);




// checkBlank Func
hbs.handlebars.registerHelper('checkBlank', (val, type) => {
	if (val == '' && type === 'dt') {
		return '---';
	} else if (val == '' && type === 'sc') {
		return '-';
	} else if (val != '' && type === 'dt') {
		return format_date_time(val);
	} else {
		return val;
	}
})

// checkLive Func
hbs.handlebars.registerHelper('checkLive', (val) => {
	if (val == 'Live') {
		return 'running-match';
	} else {
		return '';
	}
})

// checkLive Func
hbs.handlebars.registerHelper('getApiUrl', (val) => {
	return all_match_sites[val]
})

// formatDateTime Func
const format_date_time = (unix) => {
	const local_dt = new Date(unix);
    return local_dt.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})	
}

// routes
app.get('/', async (req, res) => {
	res.set("Connection", "keep-alive")
	res.set("Cache-Control", "no-cache")
	res.set("Access-Control-Allow-Origin", "*")

	res.render('index.hbs', { score_details: ScoreController, hasScore: Object.keys(ScoreController).length>0,  })
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






