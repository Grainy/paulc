var videoModal = (function($) {
	var self = this;

	var init = function() {
		_bindEvents();
	};

	/*--------------------------------
	  Swap video with autoplay video
	---------------------------------*/

	function autoPlayVideo() {
		$(".video-container").html('<iframe id="video" width="100%" height="100%" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
	}

	var _bindEvents = function() {
		$('.js-play').on('click', function() {
			$('.l-vid-modal').addClass('animated');

			autoPlayVideo();
		});

		$('.js-vid-close').on('click', function() {
			$('#video').attr('src','');

			$('.l-vid-modal').removeClass('animated');
		});
	};

	return {
		init: init
	};

})(jQuery);

jQuery(document).ready(function($) {
	videoModal.init();
});