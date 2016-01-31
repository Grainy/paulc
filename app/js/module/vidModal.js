var videoModal = (function($) {
	var self = this;

	var init = function() {
		_bindEvents();
	};

	/*--------------------------------
	  Swap video with autoplay video
	---------------------------------*/

	function autoPlayVideo(vcode, width, height) {
	  $(".video-container").html('<iframe id="video" width="'+width+'" height="'+height+'" src="https://www.youtube.com/embed/'+vcode+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allowfullscreen wmode="Opaque"></iframe>');
	}

	var _bindEvents = function() {
		$('.js-play').on('click', function() {
			$('.l-vid-modal').addClass('animated');

			autoPlayVideo('usNsCeOV4GM','100%','100%');
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