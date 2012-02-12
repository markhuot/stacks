$(document).delegate('.field[data-type="paragraph"] .icon', 'render', function(e) {
	$(this).html('&para;');
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'render', function(e) {
	$(this).attr('placeholder', '...');
	if ($('.field').size() == 1) {
		$(this).addClass('tall');
		$(this).css({
			"min-height": 200,
			"display": "block"
		});
	}
});

$(document).delegate('.field[data-type="paragraph"] td.cell', 'blur', function(e) {
	if ($('.field').size() > 1) {
		$(this).removeClass('tall');
		$(this).css({
			"min-height": 0,
			"display": "block"
		});
	}
});

$(document).on('add-field', '.fields', function(e, p) {
	$('.tall').css({
			"min-height": 0,
			"display": "block"
		});
	$('.tall').removeClass('tall');
});

$(document).delegate('.field[data-type="paragraph"]', 'update', function(e) {
	var value = $(this).find('td.cell').val().replace(/[\r\n]/g, '<br />');
	value ? $(this).attr('value', '<p>'+value+'</p>') : $(this).removeAttr('value');
});