$(document).on('add-row.stacks', '.atom', function(e) {
	var $row = $('<tr class="row"><td class="cell" contenteditable="true" /></tr>');
	$(this).find('table').append($row);
	$row.find('.cell').eq(0).trigger('focus.stacks');
});

$(document).on('remove-row.stacks', '.row', function(e) {
	var $row = $(this);
	var $atom = $row.parents('.atom').eq(0);

	if ($atom.data('multiple') && $row.siblings('.row').size() == 0) {
		$atom.trigger('remove-atom.stacks');
	}

	$(this).remove();
});

$(document).on('focus.stacks', '.row', function(e, index) {
	if (!index) { index = 0; }
	var cell = $(this).find('.cell').eq(index).get(index);
	range = document.createRange();
	range.selectNodeContents(cell);
	range.collapse(index == 0);
	selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	return false;
});
