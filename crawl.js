var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var INPUT_URL = 'http://www.allabolag.se/';
// var CRAWLED_LINKS = [];

var CRAWLED_LINKS = {
  'length': 0,
  'urls': {}
};


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
      var re = new RegExp('^http|www.allabolag.se', 'g');


      // Temporary limit to the crawling to not crash anything. Dosen't work!!
      if (CRAWLED_LINKS.length === 1000) {
        console.log('IM HERER');
        console.log('Crawling stoped automatically on 1 000! Above are all the links.');
        return;
      } else if (($("a") !== undefined)) {
          $("a").each(function(element, index, array) {
            if (re.test($(this).attr('href'))) {
              var link = $(this).attr('href');
              if (link in CRAWLED_LINKS.urls) {
                return;
              } else {
                // writeToTree(link);

                CRAWLED_LINKS.urls[link] = link;
                CRAWLED_LINKS.length ++;
                fetchPage(link);
                console.log('Crawled ' + pageToVisit + ', number of links are now ' + CRAWLED_LINKS.length);
              }
            }
          });
      } else {
        console.log('Done crawling! Number of links found is: ' + CRAWLED_LINKS);
      }
     }
  });
}

function writeToTree(url) {

}



fetchPage(INPUT_URL);