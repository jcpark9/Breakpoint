'use strict';

var startTime = new Date().getTime();

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$(".folded").each(function() {
		new FoldedList($(this));
	});
	$("#submit").click(searchVideo);
	$("#query").on('keyup', textfieldListener);
	$("#query").on('keypress', stopRKey);

	$(".preview").css("top", $(window).height()/2 - 150);

	$("#backToFullList").css("display", "none");


	$(".grid-videoitem").click(function() {
		$(this).next().fadeIn();
	});

	$(".goback").click(function() {
		$(this).parent().css("display", "none");
	})

    $(".description-button").click(function() {
    	ga("send", "event", "Show Description", "click");
        console.log("hello");
        $(this).fadeOut(function() {
            $(this).next().fadeIn();
        });
    });

    $("#recently").trigger("click");

    $(".thumbnails, .preview-thumbnails, .play").click(function() {
    	var id = $(this).attr("id");
    	playVideo(id);
    });
})

function playVideo(id) {
	console.log(id);
	var endTime = new Date().getTime();
	console.log(endTime - startTime);
	var label = "unk";
	if (id == "4bfa81198cf5fc1002a42b93") label = "salsa"; 
	if (id == "4bfa81198cf5fc1002a42b91") label = "dougie";
	if (id == "4bfa81198cf5fc1002a42b92") label = "shuffle";
	console.log(label);
	ga('send', {
		  'hitType': 'event',          // Required.
		  'eventCategory': 'Time Spent',   // Required.
		  'eventAction': 'click',      // Required.
		  'eventLabel': label,
		  'eventValue': endTime - startTime
	});
	window.location = '/video/' + id;
}

function textfieldListener() {
	console.log($(this).val());
	if ($(this).val() == "") {
		toDefaultView();
	}
}

function stopRKey(evt) {
   var evt = (evt) ? evt : ((event) ? event : null);
   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
   if ((evt.keyCode == 13) && (node.type=="text")) {
   		searchVideo();
   		return false;
   }
}

function searchVideo() {
	var query = $("#query").val();
	if (query == "" || query == "Search your videos...") {
		$(".warning .message").html("Type keywords to search for");
		$(".warning").fadeIn(function() {
			setTimeout(function() {
				$(".warning").fadeOut();
			}, 1500);
		});
	} else {
		var jqxhr = $.post(document.URL, { 'query': query })
			.done(function(data) {
				$("#backToFullList").css("display", "");
				$(".default").css("display", "none");
	  			$(".searchlist").css("display", "");

				var html = ""
				if (data.length == 0) {
					html = "<div class='guide' id='novidfound'>No video found</div>"
				} else {
					for (var i=0; i < data.length; i++) {
						var video = data[i];
						var newitem = '<div class="videoitem">\
						<a href="/video/'+ video._id +'">\
							<div class="thumbnails" style="background: url('+video.imageURL+'); background-size: cover">\
								<div class="over"><span class="helper"></span><span class="glyphicon glyphicon glyphicon-play-circle"></span></div>\
							</div>\
						</a>\
							<div class="title">'+video.title+'</div>\
							<div class="description-button"><span class="glyphicon glyphicon-chevron-right"></span> Show Description</div> \
							<div class="description">'+video.description+'</div>\
						</div>';
						html += newitem;
					}
				}
				$(".searchlist").html(html);

			    $(".description-button").click(function() {
			        console.log("hello");
			        $(this).fadeOut(function() {
			            $(this).next().fadeIn();
			        });
			    });

				$('<div/>', {
				    text: 'Search results:',
				    class: 'searchresulttitle'
				}).prependTo('.searchlist');
				$(".searchlist").slideDown();
				$("#back").attr("href","/playlist");
		  	})
			.fail(function() {
				alert( "error" );
			});
	}
}

function toDefaultView(event) {
	if (event) {
		event.preventDefault();
		$("#query").val("");
	}
	$(".default").css("display", "");
	$(".searchlist").html("");
	$(".searchlist").css("display", "none");
	$("#back").attr("href","/");
	$("#backToFullList").css("display", "none");
}


function FoldedList(button){
	var open = false;

	button.click(function() {
		if(!open) {
			$(this).next().slideDown('slow');
			open = true;
		} else {
			$(this).next().slideUp('slow');
			open = false;
		}
	});

	button.next().find(".foldbutton").click(function() {
		$(this).parent().slideUp();
		open = false;
	})
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
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
}

