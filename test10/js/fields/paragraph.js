$(document).delegate('.field[data-type="paragraph"] .icon', 'render', function(e) {
	$(this).html('&para;');
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'keyup', function(e) {
	$(this).attr('value', $(this).text());
	$(this).trigger('update');
});

$(document).delegate('.field[data-type="paragraph"]', 'update', function(e) {
	var value = $(this).find('td.cell').val().replace(/[\r\n]/g, '<br />');
	value ? $(this).attr('value', '<p>'+value+'</p>') : $(this).removeAttr('value');
});