$(document).on('render.stacks', '.cell', function(e) {
	e.stopPropagation();
});

$(document).on('keyup.stacks', '.cell', function(e) {
	$(this).attr('value', $(this).text());	
});

// $(document).on('focus.stacks', '.cell', function(e) {
// 	range = document.createRange();
// 	range.selectNodeContents(this);
// 	range.collapse(false);
// 	selection = window.getSelection();
// 	selection.removeAllRanges();
// 	selection.addRange(range);
// 	return false;
// });