var progressLabel = $('.ui-label');
progressLabel.fadeIn( );


checkReady( );
function checkReady( ) {
	if ( typeof now != 'undefined' )
		run( );
	else
		setTimeout( checkReady, 500 );
}

// boot up
function run( ) {
	setProgress( "Getting Images . . .", 20 );
	now.ready( function( ) {
		var faces = $('img');

		// load images
		pullImages( faces, 0, function( ) {
			// face finder
			setProgress( "Doing Heavy Stuff . . .", 80);
			setTimeout( catitize, 500 );
		});
	});
}


// Grabs images and then stores them on my own domain.
// otherwise it will shout at me about cross-domain taint.
// i hate taint...
function pullImages( faces, count, callback ) {
	if ( count < faces.length ) {
		var img = $(faces).get(count);
		setProgress( "Initialing Catabase . . .", 20 + ( ( 60 / faces.length ) * count ) );

		if( $(img).attr("id") != "catitizer-logo-img" ) {
			now.getImage( $(img).attr("src"), function( newpath ) {
				if ( newpath ) {
					console.log("saved");
					$(img).attr( "src", newpath );
				}
				else {
					console.log("diddnt save");
				}

				pullImages( faces, count + 1, callback );
			});
		}
		else
			// patch :/
			pullImages( faces, count + 1, callback );
	}
	else
		callback( );
}


// catitizes ( face finding. )
function catitize( ) {
	var facesFound = [ ];

	$('img').each( function(index) { 
		var coords = $(this).faceDetection( );
		if ( coords.length )
			facesFound.push(coords);
	});


	actuallyDoingItNow( facesFound, 0, function( ) {
		setProgress( "Hire Me!", 100 );
		$("#catitizer-progess-bar").addClass("catitizer-progress-done");
	});


	function actuallyDoingItNow( facesFound, count, callback ) {
		if ( count < facesFound.length ) {

			CATSINCOMING( facesFound[count] );

			setProgress( "Catitizing . . .", 80 + ( ( 20 / facesFound.length ) * count ) );
			setTimeout( function( ) { actuallyDoingItNow( facesFound, count + 1, callback ); }, 500 );
		}
		else
			callback( );
	}
}


// Gets cats and positions them.
function CATSINCOMING( face ) {
	for (var i = 0; i < face.length; i++) {
		// copy i so it doesnt get async busted.
		(function (i) {
			now.gimmeACat( function( cat ) {
				$('<img>', {
					'class':'face',
					'css': {
						'position':	'absolute',
						'left':		face[i].offsetX - ( face[i].width / 2 ) - 10 +'px',
						'top':		face[i].offsetY - ( face[i].height / 2 ) - 15  +'px',
						'width': 	face[i].width * 2.4 +'px',
						'height': 	face[i].height * 2.4 +'px'
					},
					'src' : cat
				}).appendTo('body');
			});
		})(i);
	}
}


// sets up the progress bar.
function setProgress( text, value ) {
	var progressLabel = $('.ui-label');

	progressLabel.html( text + "<b class='catitize-value'>&nbsp;&nbsp;" + value.toFixed(0) + "%</b>");

	$("#catitizer-progess-bar").css({ width: value + "%" });
}












