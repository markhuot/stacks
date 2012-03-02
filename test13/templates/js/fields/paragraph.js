$(document).on('render.stacks', '.atom[data-type="paragraph"]', function(e) {
	$(this).attr('data-focusable', false);
});