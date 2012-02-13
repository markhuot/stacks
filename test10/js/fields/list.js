$(document).delegate('.field[data-type="list"] .icon', 'render', function(e) {
	$(this).text('l');
});

$(document).delegate('.field[data-type="list"] .back', 'render', function(e) {
	$(this).html('<div class="section"><label>Style</label><select><option value="bullet">Bulleted</option><option value="number">Numbered</option></select></div>');
});

$(document).delegate('.field[data-type="list"] .cell', 'render', function(e) {
	$(this).attr('placeholder', 'Add Item...');
});

$(document).on('keyup', '.field[data-type="list"] td.cell', function(e) {
	var $field = $(this).parents('.field');
	if (e.keyCode != 8 && $(this).text() && !$field.find('.cell.placeholder').size()) {
		$(this).trigger('add-row');
	}
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
