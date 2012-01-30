/* Author: 

*/

(function($){

$(document).delegate('.chooser select', 'change', function(e) {
	var $row = $(this).parents('.row').eq(0);
	var $container = $row.parents('.field-container').eq(0);
	var oldType = $row.attr('data-type');
	var newType = $(this).val();
	$row.attr('data-type', newType);
	$row.removeClass(oldType);
	$row.addClass(newType);
	$row.trigger('init');
	$row.trigger('render-row');
	$container.trigger('update');
});

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

$(document).delegate('.row', 'render-row', function(e) {
	var $row = $(this);
	var cols = $row.attr('data-cols');
	$row.find('tr:gt(0)').remove();
	$row.find('td').remove();
	for (i=0; i<cols; i++) {
		var $cell = $('<td class="field" />');
		$row.find('tr').append($cell);
		$row.trigger('render-cell', {
			"index": i,
			"cell": $cell
		});
	}
});

$(document).delegate('.row[data-type="heading"]', 'init', function(e) {
	$(this).attr('data-cols', 1);
});

$(document).delegate('.row[data-type="heading"]', 'render-cell', function(e, p) {
	p.cell.html('<textarea rows="1" cols="80" />');
});

$(document).delegate('.row[data-type="paragraph"]', 'init', function(e) {
	$(this).attr('data-cols', 1);
});

$(document).delegate('.row[data-type="paragraph"]', 'render-cell', function(e, p) {
	p.cell.html('<textarea rows="1" cols="80" />');
});

$(document).delegate('.row[data-type="blockquote"]', 'init', function(e) {
	$(this).attr('data-cols', 2);
});

$(document).delegate('.row[data-type="blockquote"]', 'render-cell', function(e, p) {
	switch (p.index) {
		case 0:
			name ='quote';
			placeholder = 'Quote...';
			break;
		case 1:
			name ='author';
			placeholder = 'Author...';
			break;
	}
	p.cell.html('<textarea data-name="'+name+'" rows="1" cols="80" placeholder="'+placeholder+'" />');
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
