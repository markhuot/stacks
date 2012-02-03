/* Author: 

*/

(function($){

$(document).delegate('.field-container', 'update', function(e) {
	var html = '';
	$('.field').each(function() {
		var $field = $(this);
		if ($(this).hasClass('ui-sortable-placeholder')) {
			$field = $('.ui-sortable-helper');
		}
		else if ($(this).hasClass('ui-sortable-helper')) {
			return true;
		}
		$field.trigger('update-value');
		html+= $field.val();
	});
	$('#sub').html(html);
});

$(document).delegate('.field textarea', 'keyup', function(e) {
	$(this).parents('.field-container').eq(0).trigger('update');
});

$(document).delegate('.add a', 'click', function(e) {
	var $oldField = $(this).parents('.field').eq(0);
	var $newField = $oldField.clone(true).removeClass('add').hide();
	$newField.find('> .anchor').remove();
	$newField.find('*[disabled]').removeAttr('disabled');
	$oldField.before($newField);
	$newField.slideDown();
	e.preventDefault();
});

$(function() {
	$('.fields').sortable({
		"axis": "y",
		"handle": ".chooser",
		"change": function(e, ui) {
			ui.item.parents('.field-container').trigger('update');
		}
	}).enableSelection();
});

$(document).on('click', '.chooser', function(e) {
	$(this).parents('.field').eq(0).toggleClass('flip');
	$('*:focus').blur();
});

$(document).on('change', '.chooser select', function(e) {
	var $field = $(this).parents('.field').eq(0);
	var $container = $field.parents('.field-container').eq(0);
	var oldType = $field.attr('data-type');
	var newType = $(this).val();
	$field.attr('data-type', newType);
	$field.removeClass(oldType);
	$field.addClass(newType);
	$field.find('tr').remove();
	$field.trigger('init');
	$container.trigger('update');
});

$(document).on('init', '.field', function(e) {
	var $field = $(this);
	$field.attr('data-rows', 1);
	$field.attr('data-cols', 1);
	$field.trigger('set-rows');
	$field.trigger('set-cols');
	var rows = $field.attr('data-rows');
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
	var cols = $field.attr('data-cols');
	console.log(cols);
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

$(document).delegate('.field[data-type="heading"] td.cell', 'render', function(e, p) {
	$(this).html('<textarea rows="1" cols="80" />');
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'render', function(e, p) {
	$(this).html('<textarea rows="1" cols="80" />');
});

$(document).delegate('.field[data-type="blockquote"]', 'set-cols', function(e) {
	$(this).attr('data-cols', 2);
});

$(document).delegate('.field[data-type="blockquote"] td.cell', 'render', function(e, p) {
	switch (p.index.column) {
		case 0: name ='quote';
		        placeholder = 'Quote...';
		        break;
		case 1: name ='author';
		        placeholder = 'Author...';
		        break;
	}
	$(this).html('<textarea data-name="'+name+'" placeholder="'+placeholder+'" rows="1" cols="80" />');
});

$(document).delegate('.field[data-type="unorderedlist"]', 'set-rows', function(e) {
	$(this).attr('data-rows', 3);
});

$(document).delegate('.field[data-type="unorderedlist"] td.cell', 'render', function(e, p) {
	var placeholder ='';
	if (p.index.row == p.index.totalRows-1) {
		placeholder = 'placeholder="Add item..."';
	}
	$(this).html('<textarea '+placeholder+' rows="1" cols="80" />');
});

$(document).delegate('.field[data-type="unorderedlist"] textarea', 'keyup', function(e) {
	if ($(this).val() && $(this).attr('placeholder')) {
		$(this).removeAttr('placeholder');
		$(this).parents('.field').trigger('add-row');
	}
});

// ------------------------------------------------------------------------------------
// Content Setters
// ------------------------------------------------------------------------------------

$(document).delegate('.field[data-type="paragraph"]', 'update-value', function(e) {
	$(this).attr('value', '<p>'+$(this).find('textarea').val().replace(/[\r\n]/g, '<br />')+'</p>');
});

$(document).delegate('.field[data-type="heading"]', 'update-value', function(e) {
	$(this).attr('value', '<h2>'+$(this).find('textarea').val()+'</h2>');
});

$(document).delegate('.field[data-type="blockquote"]', 'update-value', function(e) {
	var tmpl = '<blockquote><p>{{ quote }}</p><cite>{{ author }}</cite></blockquote>';
	$(this).find('.cell textarea').each(function() {
		tmpl = tmpl.replace('{{ '+$(this).attr('data-name')+' }}', $(this).val());
	});
	$(this).attr('value', tmpl);
});

$(document).delegate('.field[data-type="unorderedlist"]', 'update-value', function(e) {
	var tmpl = [];
	$(this).find('.cell textarea').each(function() {
		if ($(this).val()) {
			tmpl.push($(this).val());
		}
	});
	if (tmpl.length) {
		$(this).attr('value', '<ul><li>'+tmpl.join('</li><li>')+'</li></ul>');
	}
	else {
		$(this).attr('value', '');
	}
});

})(jQuery);
