<?php

class Field implements Iterator {

	private $atoms = array();

	public function __toString() {
		return join("\n", $this->atoms);
	}

	public function add_atom($atom) {
		$this->atoms[] = $atom;
	}

	/* iterator functions */
	public function next() {
		return next($this->atoms);
	}

}

class Atom {

	private $type = 'paragraph';
	private $value = 'atom text value';

	public function __toString() {
		if (file_exists($view_path_1)) {
			return Template::render($view_path_1, $this);
		}
		else if (file_exists($view_path_2)) {
			return Template::render($view_path_2, $this);
		}
		else {
			return $this->value;
		}
	}

}
