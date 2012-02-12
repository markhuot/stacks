$(document).delegate('.field[data-type="heading"] .icon', 'render', function(e) {
	$(this).text('^');
});

$(document).delegate('.field[data-type="heading"] td.cell', 'render', function(e) {
	$(this).attr('placeholder', 'Heading...');
});

$(document).delegate('.field[data-type="heading"]', 'update', function(e) {
	$(this).attr('value', '<h2>'+$(this).find('td.cell').val()+'</h2>');
});