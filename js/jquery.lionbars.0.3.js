(function( $ ) {
	$.fn.lionbars = function(color, showOnMouseOver, visibleBar, visibleBg) {
		// Initialization
		var elements = $(this),
			targets = new Array(),
			id = 0,
			vScrollWidth=0, hScrollWidth=0,
			addHScroll=false, addVScroll=false,
			paddingTop, paddingLeft, paddingBottom, paddingRight,
			i = 0;
		
		// Main Loop
		mainLoop();
		function mainLoop() {
			for (var i=0; elements[i] !== undefined; i++) {
				if (needScrollbars(elements[i]) && !$(elements[i]).hasClass('nolionbars')) {
					// add the element to the main array
					target = elements[i];
				
					// wrap the element
					wrap(target, addVScroll, addHScroll);
					
					// hide the default scrollbar
					hideScrollbars(target, addVScroll, addHScroll);
				}
			}
		}
		
		// Core functions
		function hideScrollbars(elem, vscroll, hscroll) {
			var el = $(elem);
			
			if (vscroll) {
				el.css({ "overflow" : 'hidden' });
				movePadding(el, el.find('.lb-wrap'));
				resizeInnerWrap(el, el.find('.lb-wrap'));
				el.find('.lb-wrap').css({ "overflow" : 'auto' });
			}
		}
		function movePadding(from, to) {
			var fromEl = $(from);
			var toEl = $(to);
			
			paddingTop = fromEl.css('padding-top').replace('px', '');
			paddingLeft = fromEl.css('padding-left').replace('px', '');
			paddingBottom = fromEl.css('padding-bottom').replace('px', '');
			paddingRight = fromEl.css('padding-right').replace('px', '');
			
			fromEl.css({ "padding" : 0 });
			toEl.css({
				"padding-top" : paddingTop+'px',
				"padding-left" : paddingLeft+'px',
				"padding-bottom" : paddingBottom+'px',
				"padding-right" : paddingRight+'px' 
			});
		}
		function resizeInnerWrap(main, child) {
			var mainEl = $(main);
			var childEl = $(child);
			
			childEl.css({
				"width" : mainEl.width()+vScrollWidth - paddingLeft - paddingRight, 
				"height" : mainEl.height() - paddingTop - paddingBottom 
			});
		}
		function setVScrollbarWidth(el) {
			vScrollWidth = el.width() - el.find('.lb-v-dummy').width();
		}
		function setHScrollbarWidth(el) {
			hScrollWidth = el.height() - el.find('.lb-h-dummy').height();
		}
		function wrap(el, vscroll, hscroll) {
			var el = $(el);
			var elemId = el.attr('id');

			if (elemId !== undefined) {
				el.wrapInner('<div class="lb-wrap" id="lb-wrap-'+id+'-'+elemId+'"></div>');
				var wrap = $('#lb-wrap-'+id+'-'+elemId);
			} else {
				el.wrapInner('<div class="lb-wrap" id="lb-wrap-'+id+'"></div>');
				var wrap = $('#lb-wrap-'+id);
			}
			wrap.wrapInner('<div class="lb-content"></div>');
			if (vscroll) {
				wrap.prepend('<div class="lb-v-scrollbar"></div>');
				wrap.find('.lb-v-scrollbar').append('<div class="lb-v-scrollbar-slider"></div>');
			}
			if (hscroll) {
				wrap.prepend('<div class="lb-h-scrollbar"></div>');
				wrap.find('.lb-h-scrollbar').append('<div class="lb-h-scrollbar-slider"></div>');
			}

			// preparation for the next element
			id = id + 1;
		}
		function needScrollbars(elem) {
			var el = $(elem);
			addVScroll = false;
			addHScroll = false;
			
			// Check for vertical scroll
			el.prepend('<div class="lb-v-dummy"></div>');
			if (el.width() > $('.lb-v-dummy').width()) {
				addVScroll = true;
				setVScrollbarWidth(el);
			}
			el.find('.lb-v-dummy').remove();
			
			// Check for horizontal scroll
			el.prepend('<div class="lb-h-dummy"></div>');
			if (el.height() > $('.lb-h-dummy').height()) {
				addHScroll = true;
				setHScrollbarWidth(el);
			}
			el.find('.lb-h-dummy').remove();
			
			if (addVScroll || addHScroll) {
				return true;
			}
		}
		
		return this.each(function() {
			var $this = $(this);
		});
	};
})( jQuery );