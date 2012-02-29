$(document).on('render.stacks', '.atom[data-type="blockquote"]', function(e) {
	$(this).data('rows', 2);
});

$(document).on('render.stacks', '.atom[data-type="blockquote"] .cell', function(e, o) {
	if (o.row == 0) {
		$(this).attr('name', 'quote');
		$(this).css('height', '4em');
	}
	else if (o.row == 1) {
		$(this).attr('name', 'author');
	}
});
