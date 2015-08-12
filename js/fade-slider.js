/*
*
* Author Karo Hakobyan
* Copyright © 2015 http://www.jsliders.com
*
*/

"use strict";

(function($){
	
	$.fn.fadeSlider = function(options){
			
		var settings = $.extend({
			autoPlaySpeed : false,
			btnsText      : {
				next      : "",
				prev      : "",
				pause     : "",
				play      : ""
			},
			hoverPause    : false,
			navigation    : true,
			speed         : "normal",
			swipe         : false,
			width         : "100%"
		}, options);
		
		return this.each(function(i, elem){
			
			if ($(".slider-box", $(elem)).size() > 1) {
		
				var fs = {};
				
					fs.self     = $(elem).width(settings.width);
					fs.current  = 0;
					fs.content  = $('<div class="slider-content" style="overflow: hidden;"></div>');
					fs.next     = $('<span class="slider-btns slider-next">' + settings.btnsText.next + '</span>');
					fs.prev     = $('<span class="slider-btns slider-prev">' + settings.btnsText.prev + '</span>');
					fs.autoPlay = $('<span class="slider-play-toggle" data-pause="' + settings.btnsText.pause + '" data-play="' + settings.btnsText.play + '">' + settings.btnsText.pause + '</span>');
					fs.navList  = $('<ul class="slider-nav"></ul>');
					fs.timer    = false;
					
					// Init slider
					
					fs.count = $(".slider-box", fs.self).size();
					
					fs.content.append($(".slider-box", fs.self));
					fs.self.append(fs.content, fs.prev, fs.next);
					
					$(".slider-box", fs.self).hide().first().show();
					
					// Slider animate fn
					
					fs.animate = function (curElem, degree){
						
						if (settings.navigation) {
							$(".slider-nav-items.active", fs.navList).removeClass("active");
							$(".slider-nav-items", fs.navList).eq(curElem).addClass("active");
						}
						
						if (degree == true) {
							$(".slider-box", fs.self).eq(curElem).stop().fadeIn(settings.speed, function(){
								fs.content.removeClass('moving');
							});
						} else {
							$(".slider-box", fs.self).eq(curElem).stop().fadeOut(settings.speed, function(){
								fs.content.removeClass('moving');
							});
						}
						
					}
					
					// Pagination
					
					if (settings.navigation) {
					
						$(".slider-box", fs.self).each(function(i, elem){
							fs.navList.append($("<li class='slider-nav-items" + ((i == 0) ? fs.active = " active" : fs.active = "") + "' data-index='" + i + "'>" + (i+1) + "</li>"));
						});	
						
						fs.self.append(fs.navList);
						
						$(".slider-nav-items", fs.navList).click(function(){
						
							var dataIndex = $(this).data("index");
							
							if (dataIndex != fs.current) {
								
								fs.animate(fs.current, false);
								fs.animate(dataIndex, true);
								fs.current = dataIndex;
							}
						});
						
					}
					
					// Auto play
					
					if (settings.autoPlaySpeed) {
						
						fs.interval = function (autoPlaySpeed) {
							fs.timer = setInterval(function(){
							
								if (fs.current < fs.count - 1) {							
									fs.animate(fs.current, false);
									fs.animate(++fs.current, true);
								} else {								
									fs.animate(fs.current, false);
									fs.animate(fs.current = 0, true);
								}
								
							}, autoPlaySpeed);
						}
						
						fs.interval(settings.autoPlaySpeed);								
						fs.next.after(fs.autoPlay);
						
						if (settings.hoverPause) {
						
							$(".slider-box, .slider-btns, .slider-nav", fs.self).hover(function(){
								if (!fs.autoPlay.hasClass("pause")) {
									fs.autoPlay.addClass("stop").text(fs.autoPlay.data("play"));
									clearInterval(fs.timer);
								}
							}, function(){
								if (!fs.autoPlay.hasClass("pause")) {
									fs.autoPlay.removeClass("stop").text(fs.autoPlay.data("pause"));
									fs.interval(settings.autoPlaySpeed);
								}
							});
							
						}
						
						fs.autoPlay.click(function(){
							if (!fs.autoPlay.hasClass("pause")) {
								fs.autoPlay.addClass("pause").text(fs.autoPlay.data("play"));
								clearInterval(fs.timer);
							} else {
								fs.autoPlay.removeClass("pause").text(fs.autoPlay.data("pause"));
								fs.interval(settings.autoPlaySpeed);
							}
						});
						
					}
					
					// Slider buttons
					
					fs.next.click(function(){
						if (fs.current < fs.count - 1) {						
							fs.animate(fs.current, false);
							fs.animate(++fs.current, true);
						} else {						
							fs.animate(fs.current, false);
							fs.animate(fs.current = 0, true);
						}
					});
					
					fs.prev.click(function(){
						if (fs.current > 0) {						
							fs.animate(fs.current, false);
							fs.animate(--fs.current, true);
						} else {						
							fs.animate(fs.current, false);
							fs.animate(fs.current = fs.count - 1, true);
						}
					});
					
					// Swipe
					
					if (settings.swipe) {
						
						fs.linkPreventClick = function( elem ) {
							
							elem.click(function(){
										
								if ( fs.content.hasClass('moving') ) {
									return false;
								}
								
							});
							
						};
						
						fs.content.swipe({
							threshold        : 0,
							excludedElements : 'button, input, select, textarea, .noSwipe',
							allowPageScroll  : 'vertical',
							swipeStatus      : function(event, phase, direction, distance, duration, fingerCount){
								
								if (((direction == 'left' || direction == 'up') && distance && phase == 'end') || phase == 'cancel') {
									fs.content.addClass('moving');
									fs.linkPreventClick( $('.slider-box', fs.wrapper) );
									fs.next.click();
								}
								
								if ((direction == 'right' || direction == 'down') && distance && phase == 'end') {
									fs.content.addClass('moving');
									fs.linkPreventClick( $('.slider-box', fs.wrapper) );
									fs.prev.click();
								}
								
							}

						});
					}
					
			}
		
		});
		
	};
	
})(jQuery);
