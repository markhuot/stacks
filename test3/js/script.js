/* Author: 

*/

(function($){

$(document).delegate('.chooser select', 'change', function(e) {
	$(this).parents('.row').eq(0).trigger('update-content-type');
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

$(function() {
	$('.rows').sortable({
		"axis": "y",
		"change": function(e, ui) {
			ui.item.parents('.field-container').trigger('update');
		}
	});
})

// ------------------------------------------------------------------------------------
// Content Setters
// ------------------------------------------------------------------------------------

$(document).delegate('.row.paragraph', 'update-value', function(e) {
	$(this).attr('value', $(this).find('textarea').val().replace(/[\r\n]/g, '<br />'));
});

$(document).delegate('.row.heading', 'update-value', function(e) {
	$(this).attr('value', '<h2>'+$(this).find('textarea').val()+'</h2>');
});

$(document).delegate('.row.blockquote', 'update-value', function(e) {
	var tmpl = '<blockquote><p>{{ quote }}</p><cite>{{ author }}</cite></blockquote>';
	$(this).find('.field textarea').each(function() {
		tmpl = tmpl.replace('{{ '+$(this).attr('data-name')+' }}', $(this).val());
	});
	$(this).attr('value', tmpl);
});

$(document).delegate('.row.unorderedlist', 'update-value', function(e) {
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