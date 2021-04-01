const http = require("https");
const fs = require('fs');

const stockData

const options = {
	"method": "GET",
	"hostname": "alpha-vantage.p.rapidapi.com",
	"port": null,
	"path": "/query?function=GLOBAL_QUOTE&symbol=TSLA",
	"headers": {
		"x-rapidapi-key": "01f5d3f161msh2bdda359609b55dp171a15jsn75ee967eb8ff",
		"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
		"useQueryString": true
	}
};

const req = http.request(options, function (res) {
	const chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		stockData = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();

fs.writeFile()
