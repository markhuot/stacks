$(document).delegate('.field[data-type="blockquote"] .icon', 'render', function(e) {
	$(this).text('"');
});

$(document).delegate('.field[data-type="blockquote"]', 'set-rows', function(e) {
	$(this).attr('data-rows', 2);
});

$(document).delegate('.field[data-type="blockquote"] td.cell', 'render', function(e, p) {
	switch (p.index.row) {
		case 0: name ='quote';
		        placeholder = 'Quote...';
		        rows = 5;
		        break;
		case 1: name ='author';
		        placeholder = 'Author...';
		        rows = 1;
		        break;
	}
	$(this).html('<textarea data-name="'+name+'" placeholder="'+placeholder+'" rows="'+rows+'" cols="80" />');
});

$(document).delegate('.field[data-type="blockquote"]', 'update-value', function(e) {
	var tmpl = '<blockquote><p>{{ quote }}</p><cite>{{ author }}</cite></blockquote>';
	$(this).find('.cell textarea').each(function() {
		tmpl = tmpl.replace('{{ '+$(this).attr('data-name')+' }}', $(this).val());
	});
	$(this).attr('value', tmpl);
});