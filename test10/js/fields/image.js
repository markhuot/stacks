$(document).delegate('.field[data-type="img"]', 'init', function(e) {
	$(this).attr('data-rows', 2);
	$(this).attr('data-cols', 2);
});

$(document).delegate('.field[data-type="img"] .icon', 'render', function(e) {
	$(this).text('P');
});

$(document).delegate('.field[data-type="img"] td.cell', 'render', function(e, p) {
	switch (p.index.row+':'+p.index.column) {
		case '0:0':
			name ='image';
			placeholder = 'Image...';
			width = false;
			$(this).attr('colspan', 2);
			break;
		case '0:1':
			$(this).remove();
			return;
		case '1:0':
			name ='caption';
			placeholder = 'Caption...';
			width = '66%';
			break;
		case '1:1':
			name ='credit';
			placeholder = 'Credit...';
			width = '33%';
			break;
	}

	$(this).attr('data-name', name);
	$(this).attr('width', width);
	$(this).attr('placeholder', placeholder);
});

$(document).delegate('.field[data-type="img"] td.cell', 'keyup', function(e) {
	$(this).attr('value', $(this).text());
	$(this).trigger('update');
});

$(document).delegate('.field[data-type="img"]', 'update', function(e) {
	var $field = $(this);
	var src = $field.find('td.cell[data-name="image"]').val();
	var caption = $field.find('td.cell[data-name="caption"]').val();
	var credit = $field.find('td.cell[data-name="credit"]').val();
	src ? $field.attr('value', '<figure><img src="'+src+'" style="max-width:200px" /><p>'+caption+' -'+credit+'</p></figure>') : $field.removeAttr('value');
});