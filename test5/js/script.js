/* Author: 

*/

(function($){

$(document).delegate('.field-container', 'update', function(e) {
	var html = '';
	$('.row').each(function() {
		var $row = $(this);
		if ($(this).hasClass('ui-sortable-placeholder')) {
			$row = $('.ui-sortable-helper');
		}
		else if ($(this).hasClass('ui-sortable-helper')) {
			return true;
		}
		$row.trigger('update-value');
		html+= $row.val();
	});
	$('#sub').html(html);
});

$(document).delegate('.row textarea', 'keyup', function(e) {
	$(this).parents('.field-container').eq(0).trigger('update');
});

$(document).delegate('.add a', 'click', function(e) {
	var $oldRow = $(this).parents('.row').eq(0);
	var $newRow = $oldRow.clone(true).removeClass('add').hide();
	$newRow.find('> .anchor').remove();
	$newRow.find('*[disabled]').removeAttr('disabled');
	$oldRow.before($newRow);
	$newRow.slideDown();
	e.preventDefault();
});

$(function() {
	$('.rows').sortable({
		"axis": "y",
		"change": function(e, ui) {
			ui.item.parents('.field-container').trigger('update');
		}
	});
});

$(document).delegate('.chooser select', 'change', function(e) {
	var $row = $(this).parents('.row').eq(0);
	var $container = $row.parents('.field-container').eq(0);
	var oldType = $row.attr('data-type');
	var newType = $(this).val();
	$row.attr('data-type', newType);
	$row.removeClass(oldType);
	$row.addClass(newType);
	$row.find('tr:gt(0)').remove();
	$row.find('td').remove();
	$row.trigger('render-row');
	$container.trigger('update');
});

$(document).delegate('.row', 'render-row', function(e) {
	var $row = $(this);
	$row.attr('data-rows', 1);
	$row.attr('data-cols', 1);

	$row.trigger('init');
	var rows = $row.attr('data-rows');
	var cols = $row.attr('data-cols');

	for (i=0; i<rows; i++) {
		if (i > 0) {
			$r = $('<tr />');
			$row.find('table').append($r);
		} else {
			$r = $row.find('tr');
		}
		for (j=0; j<cols; j++) {
			var $cell = $('<td class="field" />');
			$r.append($cell);
			$cell.trigger('render', {"index":{"row":i,"column":j}});
		}
	}
});

$(document).delegate('.row[data-type="heading"] td.field', 'render', function(e, p) {
	$(this).html('<textarea />');
});

$(document).delegate('.row[data-type="paragraph"] td.field', 'render', function(e, p) {
	$(this).html('<textarea />');
});

$(document).delegate('.row[data-type="blockquote"]', 'init', function(e) {
	$(this).attr('data-cols', 2);
});

$(document).delegate('.row[data-type="blockquote"] td.field', 'render', function(e, p) {
	switch (p.index.column) {
		case 0: name ='quote';
		        placeholder = 'Quote...';
		        break;
		case 1: name ='author';
		        placeholder = 'Author...';
		        break;
	}
	$(this).html('<textarea data-name="'+name+'" placeholder="'+placeholder+'" />');
});

$(document).delegate('.row[data-type="unorderedlist"]', 'init', function(e) {
	$(this).attr('data-rows', 4);
});

$(document).delegate('.row[data-type="unorderedlist"] td.field', 'render', function(e, p) {
	$(this).html('<textarea />');
});

// ------------------------------------------------------------------------------------
// Content Setters
// ------------------------------------------------------------------------------------

$(document).delegate('.row[data-type="paragraph"]', 'update-value', function(e) {
	$(this).attr('value', '<p>'+$(this).find('textarea').val().replace(/[\r\n]/g, '<br />')+'</p>');
});

$(document).delegate('.row[data-type="heading"]', 'update-value', function(e) {
	$(this).attr('value', '<h2>'+$(this).find('textarea').val()+'</h2>');
});

$(document).delegate('.row[data-type="blockquote"]', 'update-value', function(e) {
	var tmpl = '<blockquote><p>{{ quote }}</p><cite>{{ author }}</cite></blockquote>';
	$(this).find('.field textarea').each(function() {
		tmpl = tmpl.replace('{{ '+$(this).attr('data-name')+' }}', $(this).val());
	});
	$(this).attr('value', tmpl);
});

$(document).delegate('.row[data-type="unorderedlist"]', 'update-value', function(e) {
	var tmpl = [];
	$(this).find('.field textarea').each(function() {
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
