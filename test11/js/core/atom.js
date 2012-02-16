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
			$content = $('<div class="content" contenteditable />')
			$td = $('<td class="cell" />').append($content);
			$tr.append($td);
			$content.trigger('render.stacks', {
				"row": i,
				"column": j
			});
		}
	}

	e.stopPropagation();
});

$(document).on('add-atom.stacks', '.molecule', function(e, o) {
	if (!o.type) { o.type = 'paragraph'; }
	var $atom = $('<div class="atom" data-type="'+(o.type)+'" />');
	if (o && o.after) {
		(o.after).after($atom);
	}
	else {
		$(this).find('.atoms').append($atom);
	}
	$atom.trigger('render.stacks');
	$atom.find('.cell').eq(0).trigger('focus.stacks');
});

$(document).on('remove-atom.stacks', '.atom', function(e) {
	$(this).remove();
});