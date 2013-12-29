jQuery(function($) {
	// define a list of page types that we want to match on / insert into
	var handlers = [
		{
			'selector': '.episodeList li',
			'insert': function() {
				var elem = $('<span class="mltBtn"><a class="svf-button svfb-silver evo-btn svf-button-inq" style="margin-left:10px"><span class="inr">Random Episode</span></a></span>');
				elem.on('click', function() {
					var idx = randomIdx($('.episodeList li').length);
					$('#e' + idx).trigger('click');
				});
				$('#seasonSelector').after(elem);
			}
		},
		{
			'selector': '.currentSeason .videoRow',
			'insert': function() {
				var elem = $('<span class="mltBtn" style="position:relative;top:35px;float:right"><a class="svf-button svfb-silver evo-btn svf-button-inq" style="margin-left:10px"><span class="inr">Random Episode</span></a></span>');
				elem.on('click', function() {
					var idx = randomIdx($('.currentSeason .videoRow').length);
					$('.currentSeason .videoRow:nth-child(' + idx + ')').trigger('click');
				});
				$('.video-controls').css('height', '70px');
				$('.video-controls .video-tabs').after(elem);
			},
			'buttonHtml': '<div class="write-btn-wrap"><div class="dp-btn-wrap"><a class="dp-btn">Random Episode</a></div></div>'
		}
	];

	// utility function to select a random link
	function randomIdx(max) {
		return Math.ceil(Math.random() * max);
	}

	// search the page for each handler and insert if applicable
	$.each(handlers, function(i, v) {
		if ($(v.selector).length > 0) {
			v.insert()
		}
	});
});
