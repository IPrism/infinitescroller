(function(window, $, undefined) {

	$.fn.infinitescroller = function(options) {

		if (!this.length) { return this; }

		var opts = $.extend(true, {}, $.fn.infiniteScroller.defaults, options);
		var $this = $(this);

		$(window).scroll(function(){
			if ($(window).scrollTop() == $(document).height() - $(window).height() + opts.bufferPix ) {
				$.ajax({
					url: opts.url,
					type: 'GET',
					dataType: opts.datatype,
					data: {id: $('.post:last').attr('id')},
					success: function(data, textStatus, xhr) {
						if(data){
							$this.append(data);
						}
						if (opts.callback typeof "function") {
							opts.callback.call();
						};
					},
					error: function(xhr, textStatus, errorThrown) {
						if(opts.debug){
							console.error(xhr);
						}
					}
				});

			};
		});
		return this;
	};

	$.fn.infinitescroller.defaults = {
		url: "page/",
		bufferPix: 40,
		debug: false,
		datatype: 'html'
		callback: function(){}
	};

})(window, jQuery);
