$(document).on('add-row.stacks', '.atom', function(e) {
	var $row = $('<tr class="row"><td class="cell" contenteditable="true" /></tr>');
	$(this).find('table').append($row);
	$row.find('[contenteditable]').eq(0).trigger('focus.stacks');
});

$(document).on('remove-row.stacks', '.row', function(e) {
	$(this).remove();
});

$(document).on('focus.stacks', '.row', function(e, index) {
	if (!index) { index = 0; }
	var cell = $(this).find('.cell').eq(index).get(0);
	range = document.createRange();
	range.selectNodeContents(cell);
	range.collapse(index == 0);
	selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	return false;
});