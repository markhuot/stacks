$(document).on('keydown.stacks', '.molecule', function(e) {
	var keys = {
		DELETE: 8,
		FWD_DELETE: 46,
		RETURN: 13
	}
	var $atom = $(e.srcElement).parents('.atom').eq(0);
	var $row = $(e.srcElement).parents('.row').eq(0);
	var $cell = $(e.srcElement);

	if (e.keyCode == keys.DELETE && !$cell.val()) {
		if ($cell.prev('.cell').size()) {
			$cell.prev('.cell').trigger('focus');
		}
		else if ($atom.data('multiple') && $row.prev('.row').size()) {
			$row.prev('.row').trigger('focus.stacks', -1);
			$row.trigger('remove-row.stacks');
		}
		else if (!$atom.data('multiple') && $row.prev('.row').size()) {
			$row.prev('.row').trigger('focus.stacks', -1);
		}
		else {
			$atom.prev('.atom').trigger('focus.stacks', -1);
			$atom.trigger('remove-atom.stacks');
		}

		return false;
	}

	if (e.keyCode == keys.FWD_DELETE && !$cell.val()) {
		if ($cell.next('.cell').size()) {
			$cell.next('.cell').trigger('focus');
		}
		else if ($atom.data('multiple') && $row.next('.row').size()) {
			$row.next('.row').trigger('focus.stacks', 0);
			$row.trigger('remove-row.stacks', 0);
		}
		else if ($atom.data('multiple') && !$row.next('.row').size()) {
			$atom.next('.atom').trigger('focus.stacks', 0);
			$row.trigger('remove-row.stacks', 0);
		}
		else {
			$atom.next('.atom').trigger('focus.stacks', 0);
			$atom.trigger('remove-atom.stacks');
		}

		return false;
	}

	if (e.keyCode == keys.RETURN) {
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
