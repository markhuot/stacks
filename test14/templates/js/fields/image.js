$(document).on('render.stacks', '.atom[data-type="image"]', function(e) {
	$(this).data('cols', 2);
	$(this).data('rows', 2);
});

$(document).on('render.stacks', '.atom[data-type="image"] .cell', function(e, o) {
	if (o.row == 0 && o.column == 0) {
		$(this).attr('data-focusable', false);
		$(this).attr('data-name', 'src');
		$(this).attr('colspan', 2);
		$(this).html('<input type="file" />');
	}
	if (o.row == 0 && o.column == 1) {
		$(this).remove();
	}
	if (o.row == 1 && o.column == 0) {
		$(this).attr('data-name', 'caption');
		$(this).css('width', '70%');
	}
	if (o.row == 1 && o.column == 1) {
		$(this).attr('data-name', 'credit');
		$(this).css('width', '30%');
	}
});
