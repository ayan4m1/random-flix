// ==UserScript==
// @name        random-flix
// @namespace   http://thekreml.in
// @version     0.1
// @grant       none
// @description Add a 'Random Episode' button to Netflix Watch Instantly pages.
// @match       http://movies.netflix.com/WiMovie/*
// ==/UserScript==

jQuery(function($) {
	function isShowPage() {
		return ($('.episodeList li').length > 0);
	}

	function createButton() {
		var elem = $('<span class="btnWrap mltBtn"><a class="svf-button svfb-silver addlk evo-btn svf-button-inq save2add"><span class="inr">Random Episode</span></a></span>');
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
