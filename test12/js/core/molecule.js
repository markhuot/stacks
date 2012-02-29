$(document).on('render.stacks', '.cell', function(e) {
	e.stopPropagation();
});

$(document).on('render.stacks', '.molecule', function(e) {
	$(this).append('<div class="atoms"><div class="atom" data-type="paragraph" /></div>');
	$(this).append($('<ul />', {"class":"add"}));
	$(this).find('.add').trigger('render.stacks');
	$(this).find('.atom').trigger('render.stacks');
	e.stopPropagation();
});

$(document).on('render.stacks', '.molecule > .add', function(e) {
	$(this).append('<li><a href="#" data-type="heading">Heading</a></option>');
	$(this).append('<li><a href="#" data-type="paragraph">Paragraph</a></option>');
	$(this).append('<li><a href="#" data-type="blockquote">Blockquote</a></option>');
	$(this).append('<li><a href="#" data-type="list">List</a></option>');
	$(this).append('<li><a href="#" data-type="image">Image</a></option>');
	$(this).append('<li><a href="#" data-type="rule">Rule</a></option>');
	e.stopPropagation();
});

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
	var $molecule = $src.parents('.molecule').eq(0);
	var $atom = $src.hasClass('atom')?$src:$src.parents('.atom').eq(0);
	var $row = $src.hasClass('row')?$src:$src.parents('.row').eq(0);
	var $cell = $src.hasClass('cell')?$src:$src.parents('.cell').eq(0);

	if (e.keyCode == keys.DELETE && !$cell.val()) {
		if ($cell.prevAll('.cell[data-focusable!="false"]').size()) {
			$cell.prevAll('.cell[data-focusable!="false"]').eq(0).trigger('foci.stacks', -1);
		}
		else if ($atom.data('multiple') && $row.prev('.row').size()) {
			$row.prev('.row').trigger('foci.stacks', -1);
			$row.trigger('remove.stacks');
		}
		else if (!$atom.data('multiple') && $row.prevAll('.row:has(.cell[data-focusable!="false"])').size()) {
			$row.prevAll('.row:has(.cell[data-focusable!="false"])').eq(0).trigger('foci.stacks', -1);
		}
		else if (!$src.hasClass('atom') && $atom.is('[data-focusable!="false"]')) {
			$atom.find(':focus').blur();
			$atom.focus();
		}
		else if ($atom.prev('.atom').find('.row:has(.cell[data-focusable!="false"])').size()) {
			$atom.prev('.atom').trigger('foci.stacks', -1);
			$atom.trigger('remove.stacks');
		}
		else {
			$atom.prev('.atom').focus();
			$atom.trigger('remove.stacks');
		}

		return false;
	}

	if (e.keyCode == keys.FWD_DELETE && !$cell.val()) {
		if ($cell.next('.cell').size()) {
			$cell.next('.cell').trigger('foci.stacks');
		}
		else if ($atom.data('multiple') && $row.next('.row').size()) {
			$row.next('.row').trigger('foci.stacks', 0);
			$row.trigger('remove-row.stacks', 0);
		}
		else if ($atom.data('multiple') && !$row.next('.row').size()) {
			$atom.next('.atom').trigger('foci.stacks', 0);
			$row.trigger('remove-row.stacks', 0);
		}
		else {
			$atom.next('.atom').trigger('foci.stacks', 0);
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
			$molecule.trigger('add-atom.stacks', {
				"after": $atom
			});
			$row.trigger('remove.stacks');
		}
		else if (!$atom.data('multiple') && $row.next('.row').size()) {
			$row.next('.row').trigger('foci.stacks');
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

$(document).on('focus', '.molecule .cell[data-focusable="false"]', function(e) {
	$(e.srcElement).blur();
	$(e.srcElement).parents('.atom').focus();
});

$(document).on('foci.stacks', '.molecule', function(e, index) {
	if (!index) { index = 0; }
	var $target = $(e.target);

	if ($target.hasClass('atom')) {
		$target.find('.row:has(.cell[data-focusable!="false"])').eq(index).trigger('foci.stacks', index);
	}

	else if ($target.hasClass('row')) {
		$target.find('.cell').eq(index).trigger('foci.stacks', index);
	}

	else if ($target.hasClass('cell')) {
		var editableElement = $target.find('[contenteditable]').get(index);
		range = document.createRange();
		range.selectNodeContents(editableElement);
		range.collapse(index == 0);
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}

	e.stopPropagation();
});

$(document).on('remove.stacks', '.molecule', function(e) {
	var $target = $(e.target);
	var $molecule = $target.parents('.molecule').eq(0);
	var $atom = $target.hasClass('atom')?$target:$target.parents('.atom').eq(0);
	var $row = $target.hasClass('row')?$target:$target.parents('.row').eq(0);
	var $cell = $target.hasClass('cell')?$target:$target.parents('.cell').eq(0);

	if ($target.hasClass('row') && $atom.data('multiple') && $row.siblings('.row').size() == 0) {
		$atom.trigger('remove.stacks');
	}

	$target.remove();
	e.stopPropagation();
});