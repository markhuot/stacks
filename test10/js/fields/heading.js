$(document).delegate('.field[data-type="heading"] .icon', 'render', function(e) {
	$(this).text('^');
});

$(document).delegate('.field[data-type="heading"] td.cell', 'render', function(e, p) {
	$(this).html('<textarea rows="1" cols="80" placeholder="Heading..." />');
});

$(document).delegate('.field[data-type="heading"]', 'update-value', function(e) {
	$(this).attr('value', '<h2>'+$(this).find('textarea').val()+'</h2>');
});