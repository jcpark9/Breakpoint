'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {

	$(".block").each(function() {
		new Highlight($(this));
	});

	new AddToSetlist($("#add"));

})

function Highlight(block) {
	block.click(function() {
		$("input[type='radio']").next().css("color", "#A0A0A0");
		$("input[type='radio']").parent().next().slideUp();

    	$(this).children().first().prop("checked", true);
	    $(this).children().last().css("color", "#eb006f");
	    $(this).next().slideDown('slow');
	});
}


function AddToSetlist(button) {
	button.click(function() {
		var title = $("#title").val();
		var description = $("#description").val();

		var value = $("input[type=radio]:checked").val();
		console.log(value);

		if (value == undefined) {
			$(".warning .message").html("Oops, you forgot to select a setlist");
			$(".warning").fadeIn(function() {
				setTimeout(function() {
					$(".warning").fadeOut("slow");
				}, 2000);
			});
		} else {
			var jqxhr = $.post(document.URL, { 'setlistId': value })
				.done(function(data) {
					$(".notification .message").text("The video has been added to a setlist");
					$(".notification").fadeIn(function() {
						setTimeout(function() {
							window.location.href = "/setlist/" + data.setlistId + "#bottom";
						}, 1500);
					});		
			  	})
				.fail(function() {
					alert( "error" );
				});
		}
	});
}
