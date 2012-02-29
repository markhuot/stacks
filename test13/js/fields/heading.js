$(document).on('render.stacks', '.atom[data-type="heading"]', function(e) {
	$(this).attr('data-focusable', false);
});