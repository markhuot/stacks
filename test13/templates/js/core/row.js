$(document).on('add-row.stacks', '.atom', function(e) {
	var $row = $('<tr class="row"><td class="cell"><div class="content" contenteditable /></tr>');
	$(this).find('table').append($row);
	$row.find('.cell').eq(0).trigger('foci.stacks');
});