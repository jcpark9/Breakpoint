'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

	$(".removebutton").each(function() {
		new Remove($(this));
	});

    $(".description-button").click(function() {
        console.log("hello");
        $(this).fadeOut(function() {
            $(this).next().fadeIn();
        });
    });
})



function initializePage() {
	new RemoveButton($(".remove"));
	new Delete($("#delete"));
}

function RemoveButton(button){
	var removeenabled = false;

	button.click(function() {
		if (removeenabled) {
			$(".removebutton").fadeOut();
			removeenabled = false;
		} else {
			$(".removebutton").fadeIn();
			removeenabled = true;
		}
	});
}

function Remove(button) {
	button.click(function() {
		var id = $(this).attr("id");
		var button = $(this);

		/* Remove fragment identifier */
		var currURL = document.URL;
		var index = currURL.indexOf('#');
		if (index > 0) currURL = currURL.substring(0, index);

		var jqxhr = $.get(currURL + "/remove/" + id)
			.done(function(data) {
				$(".notification .message").html("Video has been removed from setlist");
				$(".notification").fadeIn(function() {
					setTimeout(function() {
						$(".notification").fadeOut("slow");
					}, 1000);
				});

				console.log(data);
				button.parent().next().remove();
				button.parent().remove();
				if (data.num_vids > 0) {
					var i=1;
					$(".number").each(function() {
						$(this).html("ROUTINE #" + i);
						i++;
					});
				} else {
					$(".guide").text("Setlist is empty. Try adding videos.")
				}

		  	})
			.fail(function() {
				alert( "error" );
			});
	});
}

function Delete(button) {
	button.click(function() {
		var jqxhr = $.get(document.URL + "/delete")
			.done(function(data) {
				$(".notification .message").html("Setlist has been deleted");
				$(".notification").fadeIn(function() {
					setTimeout(function() {
						window.location.href = "/playlist";
					}, 1000);
				});		
		  	})
			.fail(function() {
				alert( "error" );
			});
	});
}
