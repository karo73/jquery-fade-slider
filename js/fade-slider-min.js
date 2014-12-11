/*
*
* Author Karo Hakobyan
*
*/

"use strict";!function(e){e.fn.fadeSlider=function(a){var t=e.extend({autoPlaySpeed:!1,btnsText:{next:"",prev:"",pause:"",play:""},hoverPause:!1,navigation:!0,speed:"normal",swipe:!1,width:"100%"},a);return this.each(function(a,n){if(e(".slider-box",e(n)).size()>1){var s={};s.self=e(n).width(t.width),s.current=0,s.content=e('<div class="slider-content" style="overflow: hidden;"></div>'),s.next=e('<span class="slider-btns slider-next">'+t.btnsText.next+"</span>"),s.prev=e('<span class="slider-btns slider-prev">'+t.btnsText.prev+"</span>"),s.autoPlay=e('<span class="slider-play-toggle" data-pause="'+t.btnsText.pause+'" data-play="'+t.btnsText.play+'">'+t.btnsText.pause+"</span>"),s.navList=e('<ul class="slider-nav"></ul>'),s.timer=!1,s.count=e(".slider-box",s.self).size(),s.content.append(e(".slider-box",s.self)),s.self.append(s.content,s.prev,s.next),e(".slider-box",s.self).hide().first().show(),s.animate=function(a,n){t.navigation&&(e(".slider-nav-items.active",s.navList).removeClass("active"),e(".slider-nav-items",s.navList).eq(a).addClass("active")),1==n?e(".slider-box",s.self).eq(a).stop().fadeIn(t.slideSpeed):e(".slider-box",s.self).eq(a).stop().fadeOut(t.slideSpeed)},t.navigation&&(e(".slider-box",s.self).each(function(a){s.navList.append(e("<li class='slider-nav-items"+(s.active=0==a?" active":"")+"' data-index='"+a+"'>"+(a+1)+"</li>"))}),s.self.append(s.navList),e(".slider-nav-items",s.navList).click(function(){var a=e(this).data("index");a!=s.current&&(s.animate(s.current,!1),s.animate(a,!0),s.current=a)})),t.autoPlaySpeed&&(s.interval=function(e){s.timer=setInterval(function(){s.current<s.count-1?(s.animate(s.current,!1),s.animate(++s.current,!0)):(s.animate(s.current,!1),s.animate(s.current=0,!0))},e)},s.interval(t.autoPlaySpeed),s.next.after(s.autoPlay),t.hoverPause&&e(".slider-box, .slider-btns, .slider-nav",s.self).hover(function(){s.autoPlay.hasClass("pause")||(s.autoPlay.addClass("stop").text(s.autoPlay.data("play")),clearInterval(s.timer))},function(){s.autoPlay.hasClass("pause")||(s.autoPlay.removeClass("stop").text(s.autoPlay.data("pause")),s.interval(t.autoPlaySpeed))}),s.autoPlay.click(function(){s.autoPlay.hasClass("pause")?(s.autoPlay.removeClass("pause").text(s.autoPlay.data("pause")),s.interval(t.autoPlaySpeed)):(s.autoPlay.addClass("pause").text(s.autoPlay.data("play")),clearInterval(s.timer))})),s.next.click(function(){s.current<s.count-1?(s.animate(s.current,!1),s.animate(++s.current,!0)):(s.animate(s.current,!1),s.animate(s.current=0,!0))}),s.prev.click(function(){s.current>0?(s.animate(s.current,!1),s.animate(--s.current,!0)):(s.animate(s.current,!1),s.animate(s.current=s.count-1,!0))}),t.swipe&&s.content.swipe({swipe:function(e,a){"left"==a?s.next.click():"right"==a?s.prev.click():null},threshold:0,fingers:"all"})}})}}(jQuery);