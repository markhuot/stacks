$(document).delegate('.field[data-type="paragraph"] .icon', 'render', function(e) {
	$(this).html('&para;');
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'render', function(e, p) {
	$(this).html($('<textarea />', {
		"rows": 1,
		"cols": 80,
		"placeholder": "..."
	}));
});

$(document).delegate('.field[data-type="paragraph"] textarea', 'keyup', function(e) {
	$(this).parents('.cell').attr('value', $(this).val());
	$(this).trigger('update');
});

$(document).delegate('.field[data-type="paragraph"]', 'update', function(e) {
	$(this).attr('value', '<p>'+$(this).find('textarea').val().replace(/[\r\n]/g, '<br />')+'</p>');
});