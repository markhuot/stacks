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

$(document).delegate('.row[data-type="blockquote"]', 'init', function(e) {
	
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
