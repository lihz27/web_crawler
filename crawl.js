var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var INPUT_URL = 'https://techcrunch.com/'
var CRAWLED_LINKS = [];

// Define all the hyperlinks on the page
// Recursively go through each

// crawler(INPUT_URL);

function crawler(url) {
  
  var urls = getUrls();

  urls.forEach(function(element, index, array) {
    CRAWLED_LINKS.push(element);
    crawler(element);
  });
}

function fetchPage() {
  var pageToVisit = INPUT_URL;
  console.log("Visiting page " + pageToVisit);
  request(pageToVisit, function(error, response, body) {
    if (error) {
      console.log("Error: " + error);
    }

    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);

    if (response.statusCode === 200) {
       // Parse the document body
      var $ = cheerio.load(body);

      $("a").each(function(element, index, array) {
        CRAWLED_LINKS.push($(this).attr('href'));
      });

      console.log(CRAWLED_LINKS);
     }
  });
}

fetchPage();
console.log(CRAWLED_LINKS);