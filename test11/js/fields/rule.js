$(document).on('render.stacks', '.atom[data-type="rule"] .cell', function(e) {
	$(this).attr('data-focusable', false);
});