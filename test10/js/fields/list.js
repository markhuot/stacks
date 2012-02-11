$(document).delegate('.field[data-type="list"]', 'init', function(e) {
	$(this).attr('data-rows', 3);
});

$(document).delegate('.field[data-type="list"] .icon', 'render', function(e) {
	$(this).text('l');
});

$(document).delegate('.field[data-type="list"] td.cell', 'render', function(e, p) {
	$(this).html($('<textarea />', {
		"placeholder": (p.index.row == p.index.totalRows-1) ? 'Add item...' : '',
		"rows": 1,
		"cols": 80
	}));
});

$(document).delegate('.field[data-type="list"] .back', 'render', function(e) {
	$(this).html('<div class="section"><label>Style</label><select><option value="bullet">Bulleted</option><option value="number">Numbered</option></select></div>');
});

$(document).on('keydown', '.field[data-type="list"] textarea', function(e) {
	if (e.keyCode != 13) { return true; }
	var $next = $('.row:has(*:focus)').next();
	if ($next.size()) {
		$next.find('textarea').focus();
		e.stopPropagation();
		return false;
	}
});

$(document).delegate('.field[data-type="list"] textarea', 'keyup', function(e) {
	$(this).parents('td.cell').attr('value', $(this).val());
	
	if ($(this).val() && $(this).attr('placeholder')) {
		$(this).removeAttr('placeholder');
		$(this).parents('.field').trigger('add-row');
	}

	$(this).trigger('update');
});

$(document).delegate('.field[data-type="list"]', 'update', function(e) {
	var list = [];
	var tag = $(this).attr('data-style')=='number'?'ol':'ul';

	$(this).find('.cell').each(function() {
		if ($(this).val()) {
			list.push($(this).val());
		}
	});

	list.length ? $(this).attr('value', '<'+tag+'><li>'+list.join('</li><li>')+'</li></'+tag+'>') : $(this).removeAttr('value');
});

$(document).delegate('.field[data-type="list"] .back select', 'change', function(e) {
	$(this).parents('.field').eq(0).attr('data-style', $(this).val());
	$(this).trigger('update');
});