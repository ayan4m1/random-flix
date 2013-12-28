// ==UserScript==
// @name        random-flix
// @namespace   http://thekreml.in
// @version     0.2
// @grant       none
// @description Add a 'Random Episode' button to Netflix Watch Instantly pages.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @match       http://movies.netflix.com/WiMovie/*
// ==/UserScript==

jQuery(function($) {
	function isShowPage() {
		return ($('.episodeList li').length > 0);
	}

	function createButton() {
		var elem = $('<span class="mltBtn"><a class="svf-button svfb-silver evo-btn svf-button-inq" style="margin-left:10px"><span class="inr">Random Episode</span></a></span>');
		elem.on('click', function() {
			var cnt = $('.episodeList li').length;
			var idx = Math.ceil(Math.random() * cnt);
			$('#e' + idx).trigger('click');
		});
		return elem;
	}

	function insertButton() {
		$('#seasonSelector').after(createButton());
	}

	if (isShowPage()) {
		insertButton();
	}
});
