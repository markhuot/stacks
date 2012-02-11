/* Author: 

*/

(function($){

$(document).on('update', '.fields', function(e) {
	var html = '';
	$('.field').each(function() {
		var $field = $(this);
		if ($(this).hasClass('ui-sortable-placeholder')) {
			$field = $('.ui-sortable-helper');
		}
		else if ($(this).hasClass('ui-sortable-helper')) {
			return true;
		}
		html+= $field.val();
	});
	$('#sub').html(html);
});

$(document).on('add-field', '.fields', function(e, type) {
	if (!type) { type = 'paragraph'; }
	var $oldField = $('.field').eq(-1);
	var $newField = $('<div class="field" />')
	$newField.attr('data-type', type);
	$(this).val('');
	$oldField.after($newField);
	$newField.slideDown();
	$newField.trigger('init');
	e.preventDefault();
});

$(document).on('init', '.field', function(e) {
	var $field = $(this);
	var $front = $('<div class="front" />');
	$front.append('<div class="chooser"><p class="icon" /></div><div class="field-contents"><table /></div>');
	var $back = $('<div class="back" />');
	$field.append($front);
	$field.append($back);
	$field.find('.icon').trigger('render');
	$field.find('.back').trigger('render');
	var rows = $field.attr('data-rows')?$field.attr('data-rows'):1;
	for (i=0; i<rows; i++) {
		$row = $('<tr class="row" />');
		$field.find('table').append($row);
	}
	$field.find('tr.row').each(function(i) {
		$(this).trigger('build', i);
	});
});

$(document).on('add-row', '.field', function(e) {
	var $field = $(this);
	$row = $('<tr class="row" />');
	$field.find('table').append($row);
	$row.trigger('build', $field.find('tr').size()-1);
});

$(document).on('build', '.row', function(e, row) {
	var $field = $(this).parents('.field').eq(0);
	var cols = $field.attr('data-cols')?$field.attr('data-cols'):1;
	for (j=0; j<cols; j++) {
		var $cell = $('<td class="cell" />');
		$(this).append($cell);
		$cell.trigger('render', {"index":{
			"totalRows": $field.find('tr').size(),
			"row": row,
			"totalCols": cols,
			"column": j
		}});
	}
});




$(document).on('keydown', '.field textarea', function(e) {
	if (e.keyCode != 13 || e.isPropagationStopped()) { return true; }
	var $next = $('.field:has(*:focus)').next().find('textarea').eq(0);
	
	if ($next.size()) {
		$next.focus();
		return false;
	}

	$(this).parents('.fields').eq(0).trigger('add-field');
	$('.field:has(*:focus)').next().find('textarea').eq(0).focus();

	e.preventDefault();
});














$(document).on('change', '.add select', function(e) {
	var $oldField = $('.field').eq(-1);
	var $newField = $('<div class="field" />')
	$newField.attr('data-type', $(this).val());
	$(this).val('');
	$oldField.after($newField);
	$newField.slideDown();
	$newField.trigger('init');
	e.preventDefault();
});











$(function() {
	$('.fields').sortable({
		"axis": "y",
		"handle": ".icon",
		"items": ".field:not(.add)",
		"change": function(e, ui) {
			ui.item.parents('.field-container').trigger('update');
		}
	}).enableSelection();
});

$(document).on('click', '.chooser', function(e) {
	$(this).parents('.field').siblings('.flip').removeClass('flip');
	$(this).parents('.field').eq(0).toggleClass('flip');
	$('*:focus').blur();
});

$(function() {
	$('.field').trigger('init');
});

})(jQuery);
