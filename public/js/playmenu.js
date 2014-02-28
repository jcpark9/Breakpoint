function CollapseMenu(button){
	var open = false;

	button.click(function() {
		if(!open) {
			$(".playmenu").slideDown('slow');
			open = true;
		} else {
			$(".playmenu").slideUp('slow');
			open = false;
		}
	});
}

new CollapseMenu($(".player-menu"));