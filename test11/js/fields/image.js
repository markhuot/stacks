$(document).on('render.stacks', '.atom[data-type="image"]', function(e) {
	$(this).data('cols', 2);
	$(this).data('rows', 2);
});

$(document).on('render.stacks', '.atom[data-type="image"] .cell', function(e, o) {
	if (o.row == 0 && o.column == 0) {
		$(this).attr('colspan', 2);
		$(this).removeAttr('contenteditable');
		$(this).html('<input type="file" />');
	}
	if (o.row == 0 && o.column == 1) {
		$(this).remove();
	}
	if (o.row == 1 && o.column == 0) {
		$(this).attr('width', '70%');
	}
	if (o.row == 1 && o.column == 1) {
		$(this).attr('width', '30%');
	}
});

$(document).on('keydown.stacks', '.atom[data-type="image"] .cell', function(e) {
	var $cell = $(e.srcElement);
	var $row = $cell.parents('.row').eq(0);

	if (e.keyCode == 8 && !$cell.val() && $cell.prev('.cell').size()) {
		$cell.prev('.cell').trigger('focus.stacks');
		return false;
	}
	else if (e.keyCode == 8 && !$cell.val() && $row.prev('.row').size()) {
		$row.prev('.row').find('.cell').eq(-1).trigger('focus.stacks');
		return false;
	}

	if (e.keyCode == 13 && $row.next('.row').size()) {
		$row.next('.row').find('.cell').eq(0).trigger('focus.stacks');
		return false;
	}
});