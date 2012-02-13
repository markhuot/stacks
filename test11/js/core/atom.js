$(document).on('render.stacks', '.atom', function(e) {
	var $this = $(this);
	if (!$this.data('cols')) { $this.data('cols', 1); }
	if (!$this.data('rows')) { $this.data('rows', 1); }

	$table = $('<table border="1" class="table" />');
	$this.append($table);
	for (i=0; i<$this.data('rows'); i++) {
		$tr = $('<tr class="row" />');
		$table.append($tr);
		for (j=0; j<$this.data('cols'); j++) {
			$td = $('<td class="cell" contenteditable></td>');
			$tr.append($td);
			$td.trigger('render.stacks', {
				"row": i,
				"column": j
			});
		}
	}

	e.stopPropagation();
});

$(document).on('add-atom.stacks', '.molecule', function(e, o) {
	var $atom = $('<div class="atom" data-type="paragraph" />');
	if (o && o.after) {
		(o.after).after($atom);
	}
	else {
		$(this).find('.atoms').append($atom);
	}
	$atom.trigger('render.stacks');
	$atom.find('[contenteditable]').eq(0).focus();
});

$(document).on('remove-atom.stacks', '.atom', function(e) {
	$focus = $(this).prev('.atom');
	if (!$focus.size()) {
		$focus = $(this).next('.atom');
	}
	$(this).remove();
	$focus.find('[contenteditable]').eq(-1).trigger('focus.stacks');
});