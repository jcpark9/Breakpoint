'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
});


function CreateSetlist(button) {
	button.click(function() {
		var title = $("#title").val();
		var description = $("#description").val();
		var empty = /^\s*$/.test(title);
		if (empty) {
			$("#title").css('border', '1px solid #eb006f');
			$(".warning .message").html("Title can't be blank");
			$(".warning").fadeIn(function() {
				setTimeout(function() {
					$(".warning").fadeOut("slow");
				}, 2000);
			});

		} else {
			var jqxhr = $.post("/createsetlist", { 'title': title, 'description': description })
				.done(function(data) {
					$(".notification .message").html("Setlist has been created");
					$(".notification").fadeIn(function() {
						setTimeout(function() {
							window.location.href = "/addtosetlist/" + data._id;
						}, 1500);
					});		
			  	})
				.fail(function() {
					alert( "error" );
				});

		}
	});
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	new CreateSetlist($(".create"));
}

