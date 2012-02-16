$(document).on('add-row.stacks', '.atom', function(e) {
	var $row = $('<tr class="row"><td class="cell"><div class="content" contenteditable /></tr>');
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