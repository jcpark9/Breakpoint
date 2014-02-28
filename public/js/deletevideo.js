'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});

function DeleteVideo(button) {
	button.click(function() {
		var jqxhr = $.get(document.URL.replace("confirm", ""))
			.done(function(data) {
				$(".notification").css("top", $(window).height()/2 - 80);
				$(".notification .message").html("Video has been deleted");
				$(".notification").fadeIn(function() {
					setTimeout(function() {
						window.location.href = "/";
					}, 1500);
				});
		  	})
			.fail(function() {
				alert( "error" );
			});
	});
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	new DeleteVideo($("#yes"));
	$("#no").click(function() {
		var URL = document.URL.replace("editvideo/deleteconfirm", "video");
		window.location.href = URL;
	});
}