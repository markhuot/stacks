$(document).delegate('.field[data-type="blockquote"] .icon', 'render', function(e) {
	$(this).text('"');
});

$(document).delegate('.field[data-type="blockquote"]', 'init', function(e) {
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
	$(this).attr('data-name', name);
	$(this).attr('placeholder', placeholder);
	$(this).css({
		"display": "block",
		"min-height": rows+'em'
	});
});

$(document).delegate('.field[data-type="blockquote"]', 'update', function(e) {
	var tmpl = '<blockquote><p>{{ quote }}</p><cite>{{ author }}</cite></blockquote>';
	$(this).find('td.cell').each(function() {
		tmpl = tmpl.replace('{{ '+$(this).attr('data-name')+' }}', $(this).text());
	});
	$(this).attr('value', tmpl);
});