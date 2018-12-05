var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var morgan = require('morgan');

var url = "https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&placement.visible=true&placement.available=true&placement.rec-count=6&placement.name=Below%20Article%20Thumbnails&placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init";

// app.use(express.static(__dirname + '/public'));
app.use(morgan('short'));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json());

app.set("view engine", "ejs");


request({
    url: url,
    json: true
}, function (err, res) {
    console.log(res.body.list)
    list = res.body.list;
    items = list.map((item, index) => {

    return (
      `<p id=${index}>
				<img src=${item.thumbnail[0].url} height=${item.thumbnail[0].height} width=${item.thumbnail[0].width} alt=${item.name}/><br>
				name: ${item.name}<br>
				branding: ${item.branding}<br>
				categories: ${item.categories}<br>
				origin: ${item.origin}<br>
				url: ${item.url}<br>
				</p>
			`
    )
  })
});

app.get("/", function (req, res) {
  res.render("index", {
      items: items
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 80;
}
app.listen(port, function () {
    console.log("The app is running on http://localhost:" + port);
});