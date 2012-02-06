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

$(document).delegate('.add select', 'change', function(e) {
	var $oldField = $('.field').eq(-1);
	var $newField = $('<div class="field" />')
	$newField.find('tr').remove();
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

$(document).on('init', '.field', function(e) {
	var $field = $(this);
	var $front = $('<div class="front" />');
	$front.append('<div class="chooser"><p class="icon" /></div><div class="field-contents"><table /></div>');
	var $back = $('<div class="back" />');
	$field.append($front);
	$field.append($back);
	$field.find('.icon').trigger('render');
	$field.find('.back').trigger('render');
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

$(function() {
	$('.field').trigger('init');
});

$(document).delegate('.field[data-type="heading"] .icon', 'render', function(e) {
	$(this).text('^');
});

$(document).delegate('.field[data-type="heading"] td.cell', 'render', function(e, p) {
	$(this).html('<textarea rows="1" cols="80" placeholder="Heading..." />');
});

$(document).delegate('.field[data-type="paragraph"] .icon', 'render', function(e) {
	$(this).html('&para;');
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'render', function(e, p) {
	$(this).html('<textarea rows="15" cols="80" placeholder="..." />');
});

$(document).delegate('.field[data-type="blockquote"] .icon', 'render', function(e) {
	$(this).text('"');
});

$(document).delegate('.field[data-type="blockquote"]', 'set-rows', function(e) {
	$(this).attr('data-rows', 2);
});

$(document).delegate('.field[data-type="blockquote"] td.cell', 'render', function(e, p) {
	switch (p.index.row) {
		case 0: name ='quote';
		        placeholder = 'Quote...';
		        rows = 5;
		        break;
		case 1: name ='author';
		        placeholder = 'Author...';
		        rows = 1;
		        break;
	}
	$(this).html('<textarea data-name="'+name+'" placeholder="'+placeholder+'" rows="'+rows+'" cols="80" />');
});

$(document).delegate('.field[data-type="img"] .icon', 'render', function(e) {
	$(this).text('P');
});

$(document).delegate('.field[data-type="img"]', 'set-rows', function(e) {
	$(this).attr('data-rows', 2);
	$(this).attr('data-cols', 2);
});

$(document).delegate('.field[data-type="img"] td.cell', 'render', function(e, p) {
	width = false;
	switch (p.index.row+':'+p.index.column) {
		case '0:0': name ='image';
			$(this).attr('colspan', 2);
		        placeholder = 'Image...';
		        break;
		case '0:1':
			$(this).remove();
			break;
		case '1:0': name ='caption';
		        placeholder = 'Caption...';
			width = '66%';
		        break;
		case '1:1': name ='credit';
		        placeholder = 'Credit...';
			width = '33%';
		        break;
	}
	$(this).attr('width', width);
	$(this).html('<textarea data-name="'+name+'" placeholder="'+placeholder+'" rows="1" cols="80" />');
});

$(document).delegate('.field[data-type="unorderedlist"] .icon', 'render', function(e) {
	$(this).text('l');
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

$(document).delegate('.field[data-type="unorderedlist"] .back', 'render', function(e) {
	$(this).html('<div class="section"><label>Style</label><select><option value="bullet">Bulleted</option><option value="number">Numbered</option></select></div>');
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
	var tag = $(this).attr('data-style')=='number'?'ol':'ul';
	console.log(tag);
	if (tmpl.length) {
		$(this).attr('value', '<'+tag+'><li>'+tmpl.join('</li><li>')+'</li></'+tag+'>');
	}
	else {
		$(this).attr('value', '');
	}
});

$(document).delegate('.field[data-type="unorderedlist"] .back select', 'change', function(e) {
	var $field = $(this).parents('.field').eq(0);
	$field.attr('data-style', $(this).val());
	$(this).parents('.field-container').eq(0).trigger('update');
});

$(document).delegate('.field[data-type="img"]', 'update-value', function(e) {
	var src = $(this).find('textarea[data-name="image"]').val();
	var caption = $(this).find('textarea[data-name="caption"]').val();
	var credit = $(this).find('textarea[data-name="credit"]').val();
	if (src) {
		$(this).attr('value', '<figure><img src="'+src+'" style="max-width:200px" /><p>'+caption+' -'+credit+'</p></figure>');
	}
	else {
		$(this).attr('value', '');
	}
});

})(jQuery);
