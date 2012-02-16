$(document).on('click', '.molecule .add a', function(e) {
	var $molecule = $(e.srcElement).parents('.molecule').eq(0);
	$molecule.trigger('add-atom', {
		"type": $(this).attr('data-type')
	});
	e.preventDefault();
});

$(document).on('keydown.stacks', '.molecule', function(e) {
	var keys = {
		DELETE: 8,
		FWD_DELETE: 46,
		RETURN: 13
	}

	var $src = $(e.srcElement);
	var $molecule = $(e.srcElement).parents('.molecule').eq(0);
	var $atom = $src.hasClass('atom')?$src:$(e.srcElement).parents('.atom').eq(0);
	var $row = $src.hasClass('row')?$src:$(e.srcElement).parents('.row').eq(0);
	var $cell = $src.hasClass('cell')?$src:$(e.srcElement).parents('.cell').eq(0);

	if (e.keyCode == keys.DELETE && !$cell.val()) {
		if ($cell.prev('.cell').size()) {
			$cell.prev('.cell').trigger('focus.stacks', -1);
		}
		else if ($atom.data('multiple') && $row.prev('.row').size()) {
			$row.prev('.row').trigger('focus.stacks', -1);
			$row.trigger('remove-row.stacks');
		}
		else if (!$atom.data('multiple') && $row.prev('.row').size()) {
			$row.prev('.row').trigger('focus.stacks', -1);
		}
		else if ($row.siblings('.row').size() > 0 && !$src.hasClass('atom')) {
			$atom.attr('contenteditable', true);
			$atom.focus();
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
			$molecule.trigger('add-atom.stacks', {
				"after": $atom
			});
		}
		else if (!$atom.data('multiple') && $row.next('.row').size()) {
			$row.next('.row').trigger('focus.stacks');
		}
		else {
			$molecule.trigger('add-atom.stacks', {
				"after": $atom
			});
		}

		return false;
	}
});

$(document).on('keyup.stacks', '.molecule', function(e) {
	var $src = $(e.srcElement);
	var $cell = $src.parents('.cell').eq(0);

	if ($cell.size()) {
		$cell.attr('value', $cell.find('.content').text());	
	}
});

$(document).on('focus.stacks', '.molecule', function(e, index) {
	if (!index) { index = 0; }
	var $target = $(e.target);

	if ($target.hasClass('atom')) {
		$target.find('.row').eq(index).trigger('focus.stacks', index);
	}

	else if ($target.hasClass('row')) {
		$target.find('.cell').eq(index).trigger('focus.stacks', index);
	}

	else if ($target.hasClass('cell')) {
		var editableElement = $target.find('[contenteditable]').get(0);
		range = document.createRange();
		range.selectNodeContents(editableElement);
		range.collapse(index == 0);
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}

	e.stopPropagation();
});