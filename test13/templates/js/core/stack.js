$(document).on('click', '.stack > .add a', function(e) {
	var $stack = $(this).parents('.stack').eq(0);
	$stack.trigger('add-molecule.stacks');
	e.preventDefault();
});

$(document).on('add-molecule.stacks', '.stack', function(e) {
	var $molecule = $('<div class="molecule" />');
	$(this).find('> .add').before($molecule);
	$molecule.trigger('render.stacks');
});