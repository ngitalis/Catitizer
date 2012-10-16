# Fixes url to always have http://
# this wont work with any other type of url
# TODO: filter images too...
module.exports.checkURL = ( path ) ->
	httpcheck = path.split(":");
	if httpcheck[0] != "http"
		path = "http://" + path

	console.log( "PATH: " + path )
	return path


# makes sure all paths are absolute.
# how the hell does google do this, probably a completely different proxy?
# if i wanted every link to be catitized, i could replace <a> with catitizer calls + query string.
module.exports.fixPaths = ( jQuery, path ) ->
	$ = jQuery
	trimmed = path.replace /.*?:\/\//g, ""
	rootpath = trimmed.split "/"

	images = $('img')
	for image in images
		splitted = $(image).attr("src").split(":")
		if( splitted[0] != "http" )
			$(image).attr( "src", "http://" + rootpath[0] + "/" + $(image).attr("src"))

	scripts = $("script[type*=javascript]")
	for script in scripts
		splitted = $(script).attr("src").split(":")
		if( splitted[0] != "http" && $(script).attr("src") != "")
			$(script).attr( "src", "http://" + rootpath[0] + "/" + $(script).attr("src"))

	csss = $("link[type*=css]")
	for css in csss
		splitted = $(css).attr("href").split(":")
		if( splitted[0] != "http" )
			$(css).attr( "href", "http://" + rootpath[0] + "/" + $(css).attr("href"))

	links = $('a')
	for link in links
		splitted = $(link).attr("href").split(":")
		if( splitted[0] != "http" )
			$(link).attr( "href", "http://" + rootpath[0] + "/" + $(link).attr("href"))


# boots my html, javascript and css
module.exports.bootstrap = ( jQuery, path ) ->
	$ = jQuery

	# css
	$('head').append("<link href='css/catitizer.css' rel='stylesheet' type='text/css' />");
	$('head').append("<link href='css/ui-progress-bar.css' rel='stylesheet' type='text/css' />");
	$('head').append("<link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>");

	# header
	header = "<div id='catitizer-header'>   
				<a href='/'>
					<div id='catitizer-logo'> Catitizer </div>
					<img id='catitizer-logo-img' src='images/cats/tumblr_m2weitnirP1rtuomto1_500.png' />
				</a>
				<div class='ui-progress-bar ui-container' id='catitizer-progess-container'>
					<div class='ui-progress' id='catitizer-progess-bar' style='width: 7%;'>
						<span class='ui-label' style='display:none;'>
							Meow . . .  <b class='catitize-value'>&nbsp;&nbsp;7%</b>
						</span>
					</div>
				</div> 
			</div>"
	$('body').append(header)

	# path name.

	$('body').append("<div id='catitizer-pathname' style='display: none;'>" + path + "</div>");