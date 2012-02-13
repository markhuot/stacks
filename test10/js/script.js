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

$(document).on('change', '.add select', function(e) {
	$('.fields').trigger('add-field', {type:$(this).val()});
});

$(document).on('add-field', '.fields', function(e, p) {
	if (!p.type) { p.type = 'paragraph'; }
	var $newField = $('<div class="field" />').hide();
	$newField.attr('data-type', p.type);
	if (!p.after) {
		p.after = $('.field').eq(-1);
	}
	$(p.after).after($newField);
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
		var $cell = $('<td class="cell" contenteditable />');
		$(this).append($cell);
		$cell.trigger('render', {"index":{
			"totalRows": $field.find('tr').size(),
			"row": row,
			"totalCols": cols,
			"column": j
		}});
		$cell.trigger('did-render');
	}
});

$(document).on('remove', '.row', function(e, row) {
	if (!e.isPropagationStopped()) {
		$(this).remove();
	}
});

$(document).delegate('.field td.cell', 'keyup', function(e) {
	var value = $(this).text() != $(this).attr('placeholder') ? $(this).text() :'';
	$(this).attr('value', value);
	$(this).trigger('update');
});

$(document).on('keydown', '.field', function(e) {
	var $field = $(this);
	var $cell = $(e.srcElement);
	var $row = $cell.parents('.row').eq(0);

	if (e.keyCode == 8 && $cell.attr('value') == false) {
		if ($cell.prev('.cell').size()) {
			var cell = $cell.prev().get(0);
			$(cell).focus();
			range = document.createRange();
                        range.selectNodeContents(cell);
                        range.collapse(false);
                        selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);
			return false;
		}
		if ($row.prev('.row').size()) {
			var cell = $row.prev().find('.cell').get(-1);
			$(cell).focus();
			range = document.createRange();
			range.selectNodeContents(cell);
			range.collapse(false);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			$row.trigger('remove');
			return false;
		}
		else if ($row.next('.row').size()) {
			var cell = $row.next().find('.cell').get(0);
			$(cell).focus();
			$row.trigger('remove');
			return false;
		}
		else if ($field.prev('.field').size()) {
			var cell = $field.prev().find('td.cell').eq(-1).get(0);
			$(cell).focus();
			range = document.createRange();
			range.selectNodeContents(cell);
			range.collapse(false);
			selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			$field.remove();
			return false;
		}
		else if ($field.next('.field').size()) {
			var cell = $field.next().find('td.cell').eq(0).get(0);
			$(cell).focus();
			$field.remove();
			return false;
		}
	}
	if (e.keyCode == 13 && !e.shiftKey && !e.isPropagationStopped()) {
		if ($row.next('.row').size()) {
			var cell = $row.next().find('.cell').get(0);
			$(cell).focus();
			e.preventDefault();
		}
		else {
			$field.parents('.fields').trigger('add-field', {"type":"paragraph", "after":$field});
			$('.field:has(*:focus)').next('.field').find('td.cell').eq(0).trigger('focus');
			e.preventDefault();
		}
	}
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
