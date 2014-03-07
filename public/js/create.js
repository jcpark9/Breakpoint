//Okay, so the showResponse function contains all the AJAX code and Youtube API search goes that is triggered when the
//button is clicked. So far I can display a list of videos, but the positioning is off and I haven't linked it to another
//project yet.

var finalResponse;
var i;

function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
  	console.log(response.items[0].snippet.thumbnails.default.url);
    loadXMLDoc();
    console.log(responseString);
 	function loadXMLDoc() {
 		var xmlhttp;
        var request;
 		if(window.XMLHttpRequest){
 			xmlhttp=new XMLHttpRequest();
 		}else {
 			xmlhttp = newActiveXObject("Microsoft.XMLHTTP");
 		}
        finalResponse = response;
   		var html = "<div class='guide'> Which tutorial <br/> would you like to follow? </div>";
    	for(i = 0; i < (response.items).length; i++) {
    		//I tried to teach myself Ajax (before today's lecture), and so I basically created a container, 
    		//div and used a thumbnail image, description, and title, to identify the project. I was a little confused
    		//about what we wanted to extract from the user click. Do we want to return the video id? Do we want
    		//to go to the Youtube url for the user to view the video? Would love your input!
    		html += '<div class="videoitem"> \
                <div class="thumbnails" onclick = "addData('+i+');" style="background: url('+response.items[i].snippet.thumbnails.high.url+'); background-size: cover; background-position: center center"> \
                    <div class="over"><span class="helper"></span><span class="glyphicon glyphicon glyphicon-plus"></span></div> \
                </div> \
                <div class="title">'+response.items[i].snippet.title+'</div> \
    			<div class="description-button"><span class="glyphicon glyphicon-chevron-right"></span> Show Description</div> \
                <div class="description">'+response.items[i].snippet.description+'</div> \
    			</div>';
 		}

        html += '<a href="#top"><div id="gobacktop"> GO BACK TO TOP <span class="glyphicon glyphicon-arrow-up"></span></div></a>';
 		$(".container").html(html);
 		xmlhttp.open("GET","create",true);
		xmlhttp.send();

        $(".description-button").click(function() {
            console.log("hello");
            $(this).fadeOut(function() {
                $(this).next().fadeIn();
            });
        });

 	}
}


function addData(i) {
    $.post("/create", finalResponse.items[i], callBack2);
}

 function callBack2(result) {
    console.log(result);
    $(".notification .message").html("Breakpoint video has been created <br/> and will be played shortly...");
    $(".notification").fadeIn(function() {
        setTimeout(function() {
            window.location.href = "/video/"+result;
        }, 2000);
    });
 }

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    //gapi.client.setApiKey('AIzaSyBCvmFiLUeMX4TXRMI7Ep26vO066nVyByg');
    gapi.client.setApiKey('AIzaSyBIuxGStWI52F5QUf88lV8HHl3hy8Qo3JU');

}
// LOCAL KEY: gapi.client.setApiKey('AIzaSyBCvmFiLUeMX4TXRMI7Ep26vO066nVyByg');
// HEROKU KEY: gapi.client.setApiKey('AIzaSyBIuxGStWI52F5QUf88lV8HHl3hy8Qo3JU');


function search(tag) {
    console.log(tag);
    $(".placeholder").fadeOut("slow", function() {
        $(".container").fadeIn();
    });

    var query = $("#query").val();
    if (tag) {
	   query = tag + " tutorial";
    }

    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet'
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);
}

function stopRKey(evt) {
   var evt = (evt) ? evt : ((event) ? event : null);
   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
   if ((evt.keyCode == 13) && (node.type=="text")) {
        search();
        return false;
   }
}

$(document).ready(function() {
    $("#query").on('keypress', stopRKey);

    $.getScript( "https://apis.google.com/js/client.js?onload=onClientLoad", function( data, textStatus, jqxhr ) {
      console.log( data ); // Data returned
      console.log( textStatus ); // Success
      console.log( jqxhr.status ); // 200
      console.log( "Load was performed." );

        var searched = false;
        $("#query").click(function() {
            if (!searched) {
                $("#query").css("font-style","normal");
                $("#query").css("color","black");
                $("#query").css("font-size", "13pt");
                $("#query").val("");
                searched = true;
            }
        });

        $(".container").css("display", "none");
        $(".tag").click(function() {
            search($(this).text());
        });

        $.each($('.tag'), function(key, value) {
            var random = Math.random()*3000+500;
            $(value).css({opacity: 0.0}).animate({opacity: 1.0}, random);
        });
    });

    $('.bg').css('height', ($(window).height() - 100) + 'px');
})