"use strict";
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cheerio = require('cheerio');

function formatDateTime(unix) {
	var local_dt = new Date(unix);
	return local_dt.toLocaleString()
}

const all_match_sites = {
	cricbuzz:'https://cricket-panel-backend.onrender.com/cbz',
	espn:'https://cricket-panel-backend.onrender.com/espn',
	sportskeeda:'https://cricket-panel-backend.onrender.com/sk',
	nw18:'https://cricket-panel-backend.onrender.com/nw18',
	criclinegure:'https://cricket-panel-backend.onrender.com/clg',

}


const ScoreController = {}
const getAllScores = async () => {

	try {
		Object.keys(all_match_sites).map(async(key) =>{
			const response = await fetch(all_match_sites[key]);
			const response_data = await response.json();
			if (Object.keys(response_data).length > 0) {
				ScoreController[key] = response_data;
			}
		});
		console.log('score updated!')

	} catch (error) {
		console.log('error -->', error);
	}
}
getAllScores();
setInterval(()=>{getAllScores()}, 15000);


module.exports = { ScoreController };



