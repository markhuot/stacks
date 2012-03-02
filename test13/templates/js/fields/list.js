$(document).on('render.stacks', '.atom[data-type="list"]', function(e) {
	$(this).data('multiple', true);
	$(this).attr('data-focusable', false);
});