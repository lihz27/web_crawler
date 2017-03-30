var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var INPUT_URL = 'https://www.kivra.com/';
var CRAWLED_LINKS = [];

// Define all the hyperlinks on the page
// Recursively go through each

function fetchPage(pageToVisit) {
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
      var re = new RegExp('https', 'g');


      // Temporary limit to the crawling to not crash anything. Dosen't work!!
      if (CRAWLED_LINKS.length === 1000) {
        console.log(CRAWLED_LINKS);
        return console.log('Crawling stoped automatically on 1 000! Above are all the links.');

      }

      if ($("a") !== undefined) {
        $("a").each(function(element, index, array) {
          if (re.test($(this).attr('href'))) {
            CRAWLED_LINKS.push($(this).attr('href'));
            fetchPage($(this).attr('href'));
            console.log('Crawled ' + pageToVisit + ', number of links are now' + CRAWLED_LINKS.length);
          }
        });
      } else {
        console.log('Done crawling! Number of links found is: ' + CRAWLED_LINKS);
      }
     }
  });
}

fetchPage(INPUT_URL);