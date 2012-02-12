$(document).on('mousedown', '.cell.placeholder', function(e) {
	if ($(this).text() == $(this).attr('placeholder')) {
		range = document.createRange();
		range.selectNodeContents(this);
		range.collapse();
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		return false;
	}
}) 

$(document).on('focus', '.cell.placeholder', function(e) {
	range = document.createRange();
	range.selectNodeContents(this);
	range.collapse(true);
	selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	return false;
});

$(document).on('did-render', '.cell', function(e) {
	if ($(this).text() == '') {
		$(this).addClass('placeholder');
		$(this).text($(this).attr('placeholder'));
	}
});

$(document).on('keyup', '.cell', function(e) {
	if ($(this).text() == '') {
		$(this).addClass('placeholder');
		$(this).text($(this).attr('placeholder'));
		range = document.createRange();
		range.selectNodeContents(this);
		range.collapse(true);
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}
	if ($(this).text() != $(this).attr('placeholder')) {
		$(this).removeClass('placeholder');
	}
});

$(document).on('blur', '.cell', function(e) {
	if ($(this).text() == '') {
		$(this).addClass('placeholder');
		$(this).text($(this).attr('placeholder'));
	}
	if ($(this).text() != $(this).attr('placeholder')) {
		$(this).removeClass('placeholder');
	}
});

$(document).on('keydown', '.cell', function(e) {
	if ($(this).text() == $(this).attr('placeholder')) {
		$(this).text('');
		range = document.createRange();
		range.selectNodeContents(this);
		range.collapse();
		selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}
});