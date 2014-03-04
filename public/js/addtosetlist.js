'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	$("#query").on('keyup', searchVideo);
	$("#query").on('keypress', stopRKey);
	$("#query").click(function() {
		$("#query").css("font-style","normal");
		$("#query").css("color","black");
		$("#query").css("font-size", "13pt");
		$("#query").val("");
		$('#query').keyup();
	});

	$(".block").each(function() {
		new Highlight($(this));
	});

	new AddToSetlist($("#add"));
	$("#novidfound").css("display", "none");
	$("#backToFullList").css("display", "none");

})

function stopRKey(evt) {
   var evt = (evt) ? evt : ((event) ? event : null);
   var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
   if ((evt.keyCode == 13) && (node.type=="text")) {
   		return false;
   }
}

function Highlight(block) {
	var clicked = false;
	block.click(function() {
		console.log($(this).children().first().attr("checked"));
	    if(!clicked){
	    	$(this).children().first().prop("checked", true);
	        $(this).children().last().css("color", "#eb006f");
	        $(this).next().slideDown('slow');
	        clicked = true;
	    } else {
	    	$(this).children().first().prop("checked", false);
	        $(this).children().last().css("color", "#A0A0A0");
	       	$(this).next().slideUp('slow');
	        clicked = false;
	    }
	});
}

function searchVideo() {
	var query = $(this).val();
	if (query == "") {
		toDefaultView();
	} else {
		var jqxhr = $.post(document.URL + "/search", { 'query': query })
			.done(function(data) {
				$("#backToFullList").css("display", "");
				$(".videoitem").css("display", "none");

				if (data.length == 0) {
					$("#novidfound").css("display", "");
				} else {
					$("#novidfound").css("display", "none");
					for (var i=0; i < data.length; i++) {
						var video_id = data[i];
						$("#video_" + video_id).css("display", "");
					}
				}

				$("#back").removeAttr("href");
				$("#back").attr("onclick", "toDefaultView(event)");
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
		$('#query').keyup();
	}
	$("#backToFullList").css("display", "none");
	$(".videoitem").css("display", "");
	$("#back").removeAttr("onclick");
	$("#novidfound").css("display","none");
	var URL = document.URL.replace("addtosetlist", "setlist");
	$("#back").attr("href",URL);
}



function AddToSetlist(button) {
	button.click(function() {
		var title = $("#title").val();
		var description = $("#description").val();

		var values = $("input[type=checkbox]:checked").map(function() {
    		return this.value;
		}).get();

		if (values.length == 0) {
			$(".warning .message").html("You must select at least one video");
			$(".warning").fadeIn(function() {
				setTimeout(function() {
					$(".warning").fadeOut("slow");
				}, 2000);
			});
		} else {
			var jqxhr = $.post(document.URL, { 'newvids': values })
				.done(function(data) {
					if (values.length == 1) {
						$(".notification .message").text(values.length + " video has been added");
					} else {
						$(".notification .message").text(values.length + " videos have been added");
					}
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
