// Generated by CoffeeScript 1.3.3
(function() {

  module.exports.checkURL = function(path) {
    var httpcheck;
    httpcheck = path.split(":");
    if (httpcheck[0] !== "http") {
      path = "http://" + path;
    }
    console.log("PATH: " + path);
    return path;
  };

  module.exports.fixPaths = function(jQuery, path) {
    var $, css, csss, image, images, link, links, rootpath, script, scripts, splitted, trimmed, _i, _j, _k, _l, _len, _len1, _len2, _len3, _results;
    $ = jQuery;
    trimmed = path.replace(/.*?:\/\//g, "");
    rootpath = trimmed.split("/");
    images = $('img');
    for (_i = 0, _len = images.length; _i < _len; _i++) {
      image = images[_i];
      splitted = $(image).attr("src").split(":");
      if (splitted[0] !== "http") {
        $(image).attr("src", "http://" + rootpath[0] + "/" + $(image).attr("src"));
      }
    }
    scripts = $("script[type*=javascript]");
    for (_j = 0, _len1 = scripts.length; _j < _len1; _j++) {
      script = scripts[_j];
      splitted = $(script).attr("src").split(":");
      if (splitted[0] !== "http" && $(script).attr("src") !== "") {
        $(script).attr("src", "http://" + rootpath[0] + "/" + $(script).attr("src"));
      }
    }
    csss = $("link[type*=css]");
    for (_k = 0, _len2 = csss.length; _k < _len2; _k++) {
      css = csss[_k];
      splitted = $(css).attr("href").split(":");
      if (splitted[0] !== "http") {
        $(css).attr("href", "http://" + rootpath[0] + "/" + $(css).attr("href"));
      }
    }
    links = $('a');
    _results = [];
    for (_l = 0, _len3 = links.length; _l < _len3; _l++) {
      link = links[_l];
      splitted = $(link).attr("href").split(":");
      if (splitted[0] !== "http") {
        _results.push($(link).attr("href", "http://" + rootpath[0] + "/" + $(link).attr("href")));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  module.exports.bootstrap = function(jQuery, path) {
    var $, header;
    $ = jQuery;
    $('head').append("<link href='css/catitizer.css' rel='stylesheet' type='text/css' />");
    $('head').append("<link href='css/ui-progress-bar.css' rel='stylesheet' type='text/css' />");
    $('head').append("<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>");
    header = "<div id='catitizer-header'>   				<a href='/'>					<div id='catitizer-logo'> Catitizer </div>					<img id='catitizer-logo-img' src='images/cats/tumblr_m2weitnirP1rtuomto1_500.png' />				</a>				<div class='ui-progress-bar ui-container' id='catitizer-progess-container'>					<div class='ui-progress' id='catitizer-progess-bar' style='width: 7%;'>						<span class='ui-label' style='display:none;'>							Meow . . .  <b class='catitize-value'>&nbsp;&nbsp;7%</b>						</span>					</div>				</div> 			</div>";
    $('body').append(header);
    return $('body').append("<div id='catitizer-pathname' style='display: none;'>" + path + "</div>");
  };

}).call(this);
