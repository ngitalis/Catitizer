var request = require('request');
var express = require('express');
var jsdom = require('jsdom');
var fs = require('fs');
var http = require('http-get');
var nowjs = require('now');
var utilities = require('./custom_modules/utilities');
var port = process.env.PORT || 3000
var app = express( );

// Configurations
app.configure(
    function()
    {
        app.use(express.static(__dirname + '/'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
    });




// on post
app.post('/', function(req, res) {
    // fix url.
    var path = utilities.checkURL( req.body['url'] );

    // get the site and make a virtual dom
    var options = { uri: path, timeout: 5000 };
    request(options, function(err, response, body){
        if (!err && response.statusCode == 200) {
            console.log("success!");
            if ( path.match(/(jpg|jpeg|gif|png|bmp)$/) ) {
                // is image
                // body should be binary data - should probably save it here...
                renderImage( path, res );
            }
            else {
                // not an image
                proxySite( body, path, res );
            }
        }
        else {
            console.log("error!");
            // somehow flag the catitizer to show err msg. ( redirects suck )
            flashError( res );
        }
    });
});




// Start Server
var server = app.listen(port, function() {
        console.log( "Catitizer up @: " + port );
    });




// ajaxy stuff
var everyone = nowjs.initialize(server);

// scrape an image.
everyone.now.getImage = function ( url, callback ) {
    var options = {url: url};
    var parsed = url.split("/");
    console.log(parsed[parsed.length-1]);
    http.get(options, __dirname + "/images/scraped/" + parsed[parsed.length-1], function (error, result) {
        if (error) {
            console.error(error);
            callback( );
        } else {
            callback( "images/scraped/" + parsed[parsed.length-1] );
        }
    });
};

// GIMME A CAT MANnnnn.
var startHere = 0;
everyone.now.gimmeACat = function ( callback ) {
    fs.readdir( __dirname + '/images/cats/', function ( err, files ) {
        callback( 'images/cats/' + files[startHere % files.length] );
        startHere++;
    });
}




// Virtual DOM
function proxySite( body, path, res ) {
    // inject my JS
    jsdom.env(
      body,
      ["http://code.jquery.com/jquery.min.js",
      "js/vendor/facedetection/ccv.js",
      "js/vendor/facedetection/face.js",
      "js/vendor/jquery.facedetection.js",
      "js/catitizer.js",
      "nowjs/now.js"],
      function(errors, window) {
        var $ = window.$;

        // fix the image paths.
        utilities.fixPaths( $, path );
        
        // link css, bootstrap urls, setup header
        utilities.bootstrap( $, path );

        // proxy out site
        res.writeHead(200);
        res.end(window.document.innerHTML);
      }
    );
}

function renderImage( path, res ) {
     // Get image Frame
     fs.readFile( __dirname + "/imageframe.html", 'utf8', function read(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        // create virtual dom
        jsdom.env(
          data,
          ["http://code.jquery.com/jquery.min.js",
          "js/vendor/facedetection/ccv.js",
          "js/vendor/facedetection/face.js",
          "js/vendor/jquery.facedetection.js",
          "js/catitizer.js",
          "nowjs/now.js"],
          function (errors, window) {
            var $ = window.$;

            // inject path
            $('#catitizer-frame').attr( "src", path );

            // send out site
            res.writeHead(200);
            res.end(window.document.innerHTML);
          }
        );
    });
}

function flashError( res ) {
     fs.readFile( __dirname + "/index.html", 'utf8', function read(err, data) {
        if (err) {
            console.log(err);
            return;
        }
        // create virtual dom
        jsdom.env(
          data,
          ["http://code.jquery.com/jquery.min.js"],
          function (errors, window) {
            var $ = window.$;

            // inject error message
            $('#error').html("Invalid URL");
            $('#catitizer-url').addClass('input-error');

            // send out site
            res.writeHead(200);
            res.end(window.document.innerHTML);
          }
        );
    });
}
