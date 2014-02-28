'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	// add any functionality and listeners you want here
	$(".circleContainerContainer #clicker1").click(function() {
			document.getElementById("clicker1").src = "/images/CREATE NEW.png";
			$(".circleContainerContainer #1").animate({left: '25%'});
			$(".circleContainerContainer #2").animate({right: '25%'});
	});
	$(".circleContainerContainer #clicker2").click(function() {
			document.getElementById("clicker2").src = "/images/Recently Created.png";
			$(".circleContainerContainer #3").animate({left: '25%'});
			$(".circleContainerContainer #4").animate({right: '25%'});
	});
	$(".circleContainerContainer #clicker3").click(function() {
			document.getElementById("clicker3").src = "/images/Click Create.png";
			$(".circleContainerContainer #5").animate({left: '25%'});
			$(".circleContainerContainer #6").animate({right: '25%'});
	});
	$(".circleContainerContainer #clicker4").click(function() {
			document.getElementById("clicker4").src = "/images/Set End.png";
			$(".circleContainerContainer #7").animate({left: '25%'});
			$(".circleContainerContainer #8").animate({right: '25%'});
	});
}