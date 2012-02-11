$(document).delegate('.field[data-type="list"] .icon', 'render', function(e) {
	$(this).text('l');
});

$(document).delegate('.field[data-type="list"] .back', 'render', function(e) {
	$(this).html('<div class="section"><label>Style</label><select><option value="bullet">Bulleted</option><option value="number">Numbered</option></select></div>');
});

$(document).on('keydown', '.field[data-type="list"] td.cell', function(e) {
	if (e.keyCode == 8 && $(this).text().replace(/\s*/, '') == '') {
		var $row = $(this).parents('.row');
		$row.prev().find('td.cell').focus();
		$row.remove();
		return false;
	}
	if (e.keyCode == 13) {
		var $next = $('.row:has(*:focus)').next();
		if ($next.size()) {
			$next.find('td.cell').focus();
			e.stopPropagation();
			return false;
		}
	}
});

$(document).on('keyup', '.field[data-type="list"] td.cell', function(e) {
	var $field = $(this).parents('.field');
	$(this).attr('value', $(this).text());
	
	if ($(this).text() && !$field.find('td.cell:empty').size()) {
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