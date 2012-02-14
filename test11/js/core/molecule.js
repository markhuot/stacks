$(document).on('keydown.stacks', '.molecule', function(e) {
	var $atom = $(e.srcElement).parents('.atom').eq(0);
	var $row = $(e.srcElement).parents('.row').eq(0);
	var $cell = $(e.srcElement);

	if (e.keyCode == 8 && !$cell.val()) {
		if ($atom.data('multiple') && $row.siblings('.row').size() > 0) {
			$row.trigger('remove-row.stacks');
		}
		else {
			$atom.trigger('remove-atom.stacks');
		}

		return false;
	}

	if (e.keyCode == 46 && !$cell.val()) {
		if ($atom.data('multiple') && $row.siblings('.row').size() > 0) {
			$row.trigger('remove-row.stacks');
		}
		else {
			$atom.trigger('remove-atom.stacks');
		}

		return false;
	}

	if (e.keyCode == 13) {
		if ($atom.data('multiple') && $cell.val()) {
			$atom.trigger('add-row.stacks', {
				"after": $row
			});
		}
		else if ($atom.data('multiple') && !$cell.val()) {
			$row.trigger('remove-row.stacks');
			$atom.trigger('add-atom.stacks', {
				"after": $atom
			});
		}
		else {
			$atom.trigger('add-atom.stacks', {
				"after": $atom
			});
		}

		return false;
	}
});
