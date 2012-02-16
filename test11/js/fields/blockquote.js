$(document).on('render.stacks', '.atom[data-type="blockquote"]', function(e) {
	$(this).data('rows', 2);
});