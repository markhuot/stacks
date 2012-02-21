$(document).on('render.stacks', '.atom[data-type="blockquote"]', function(e) {
	$(this).data('rows', 2);
});

$(document).on('render.stacks', '.atom[data-type="blockquote"] .cell', function(e, o) {
	if (o.row == 0) {
		$(this).css('height', '4em');
	}
});
