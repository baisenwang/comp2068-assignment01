jQuery(function($){

'use strict';

var SKADI = window.SKADI || {};

/* ==================================================
   Drop Menu
================================================== */

SKADI.subMenu = function(){
	$('#menu ul').supersubs({
		minWidth: 12,
		maxWidth: 27,
		extraWidth: 0 // set to 1 if lines turn over
	}).superfish({
		delay: 0,
		animation: {opacity:'show', height:'show'},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	}).supposition();

	$('#menu ul .sub-menu li').each(function(){
		if($(this).find('ul.sub-menu').length > 0) {
			 $(this).find('> a').append('<i class="circle"></i>');
		}
	});
};

/* ==================================================
   Creative Menu
================================================== */

SKADI.creativeMenu = function(){
	if($('#creative-menu').length > 0){  
		// Call Menu
		new gnMenu( document.getElementById( 'gn-menu' ) );

		$('#creative-menu li').each(function(){
			if($(this).find('> ul').length > 0) {
				 $(this).addClass('has-ul').children('.sub-menu').hide();
				 $(this).find('> a').append('<span class="cont"><i class="circle"></i></span>');
			}
		});

		// Open SubMenu Current Page
		$('#creative-menu li.current-menu-ancestor').each(function(){
			$(this).find('.sub-menu').first().show();
			$(this).addClass('open');
		});

		$('#creative-menu li:has(">ul") > a').click(function(){
			$(this).parent().toggleClass('open');
			$(this).parent().find('> ul').stop(true,true).slideToggle();
			return false;
		});
	}
};

/* ==================================================
   Mobile Navigation
================================================== */
/* Clone Menu for use later */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

SKADI.mobileNav = function(){
	var windowWidth = $(window).width();
	
	// Show Menu or Hide the Menu
	if( windowWidth >= 1199 ) {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
};

// Call the Event for Menu 
SKADI.listenerMenu = function(){
	
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		$('#navigation-mobile').stop().slideToggle(350, 'easeOutExpo');
		e.preventDefault();
	});
};

SKADI.mobileMenu = function(){
	$('#menu-nav-mobile li').each(function(){
		if($(this).find('> ul').length > 0) {
			 $(this).addClass('has-ul').children('.sub-menu').hide();
			 $(this).find('> a').append('<span class="cont"><i class="font-icon-arrow-down-simple-thin-round"></i></span>');
		}
	});

	$('#menu-nav-mobile li:has(">ul") > a').click(function(){
		$(this).parent().toggleClass('open');
		$(this).parent().find('> ul').stop(true,true).slideToggle();
		return false;
	});
};

/* ==================================================
   Filter Team
================================================== */

SKADI.people = function (){
if($('#team-people').length > 0){      
    var $container = $('#team-people');

    $container.imagesLoaded(function() {
        $container.isotope({
          animationEngine : 'best-available',
          itemSelector : '.single-people',
          layoutMode: 'sloppyMasonry'
        });
    });


    // filter items when filter link is clicked
    var $optionSets = $('#team-filter .option-set, #team-filter-mobile .option-set'),
        $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options );
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }

        return false;
    });
}
};

/* ==================================================
   Filter Portfolio
================================================== */

SKADI.portfolio = function (){
if($('#portfolio-projects').length > 0){       
    var $container = $('#portfolio-projects');

    // Find it Filter has Elements
	$('#portfolio-filter ul.option-set li, #portfolio-filter-mobile ul.option-set li').each( function() {
		var filter = $(this),
			filterName = $(this).find('a').attr('class'),
			portfolioItems = $('#portfolio-projects');
		
		portfolioItems.find('.item-project').each( function() {
			if ( $(this).hasClass(filterName) ) {
				filter.addClass('has-items');
			}
		});
	});

    $container.imagesLoaded(function() {
        $container.isotope({
          // options
          animationEngine: 'best-available',
		  layoutMode: 'sloppyMasonry',
          itemSelector : '.item-project'
        });
    });
	
	$(window).smartresize(function() {
		$('#portfolio-projects').isotope('reLayout');
	});


    // filter items when filter link is clicked
    var $optionSets = $('#portfolio-filter .option-set, #portfolio-filter-mobile .option-set'),
        $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options );
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }

        return false;
    });
}
};


/* ==================================================
   Masonry Blog
================================================== */

SKADI.masonryBlog = function (){
if($('.masonry-blog').length > 0){ 

	var $container = $('.masonry-area');

   
    $container.isotope({
      // options
      animationEngine: 'best-available',
	  layoutMode: 'sloppyMasonry',
      itemSelector : '.item-blog'
    });
    
	
	$(window).smartresize(function() {
		$container.isotope('reLayout');
	});
}

if($('#latest-posts').length > 0){ 

	var $container = $('#latest-posts');

   
    $container.isotope({
      // options
      animationEngine: 'best-available',
	  layoutMode: 'sloppyMasonry',
      itemSelector : '.item-blog'
    });
    
	
	$(window).smartresize(function() {
		$container.isotope('reLayout');
	});
}
};

/* ==================================================
   DropDown 
================================================== */

SKADI.dropDown = function(){
	$('.dropmenu').on('click', function(e){
		$(this).toggleClass('open');
		
		$('.dropmenu-active').stop().slideToggle(350, 'easeOutExpo');
		
		e.preventDefault();
	});
	
	// Dropdown
	$('.dropmenu-active a').on('click', function(e){
		var dropdown = $(this).parents('.dropdown');
		var selected = dropdown.find('.dropmenu .selected');
		var newSelect = $(this).html();
		
		$('.dropmenu').removeClass('open');
		$('.dropmenu-active').slideUp(350, 'easeOutExpo');
		
		selected.html(newSelect);
		
		e.preventDefault();
	});
};

/* ==================================================
   Circular Graph 
================================================== */

SKADI.circularGraph = function(){
	if($('.chart').length > 0 ){
		var chart = $('.chart');
	
		$(chart).each(function() {
			$(this).appear(function() {
				var currentChart = $(this),
					currentSize = currentChart.attr('data-size'),
					currentLine = currentChart.attr('data-line'),
					currentBgColor = currentChart.attr('data-bgcolor'),
					currentTrackColor = currentChart.attr('data-trackcolor');
				currentChart.easyPieChart({
					animate: 1000,
					barColor: currentBgColor,
					trackColor: currentTrackColor,
					lineWidth: currentLine,
					size: currentSize,
					lineCap: 'round',
					scaleColor: false,
					onStep: function(value) {
		          		this.$el.find('.percentage').text(~~value);
		        	}
				});
			});
		});
	}	
};


/* ==================================================
   FancyBox
================================================== */

SKADI.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
			padding : 0,
			helpers : {
				title : { type: 'inside' },
			},
			afterLoad : function() {
                this.title = '<span class="counter-img">' + (this.index + 1) + ' / ' + this.group.length + '</span>' + (this.title ? '' + this.title : '');
            }
		});
			
		$('.fancybox-media').fancybox({
			padding : 0,
			helpers : {
				media : true
			},
			openEffect  : 'none',
			closeEffect : 'none',
			width       : 800,
    		height      : 450,
    		aspectRatio : true,
    		scrolling   : 'no'
		});
		
		$(".fancybox-various").fancybox({
			maxWidth	: 800,
			maxHeight	: 600,
			fitToView	: false,
			width		: '70%',
			height		: '70%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
	}
};

/* ==================================================
   Accordion
================================================== */

SKADI.accordion = function(){
	if($('.accordion-builder').length > 0 ){
		var accordion_trigger = $('.accordion-heading.accordionize');
		
		accordion_trigger.delegate('.accordion-toggle','click', function(e){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else{
				accordion_trigger.find('.active').addClass('inactive');          
				accordion_trigger.find('.active').removeClass('active');   
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			e.preventDefault();
		});
	}
};

/* ==================================================
   Toggle
================================================== */

SKADI.toggle = function(){
	if($('.toggle-builder').length > 0 ){
		var accordion_trigger_toggle = $('.accordion-heading.togglize');
		
		accordion_trigger_toggle.delegate('.accordion-toggle','click', function(e){
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).addClass('inactive');
			}
			else{
				$(this).removeClass('inactive');
				$(this).addClass('active');
			}
			e.preventDefault();
		});
	}
};

/* ==================================================
   Tabs
================================================== */

SKADI.tabs = function(){
if($('.tabbable').length > 0 ){
    $('.tabbable').each(function() {
        $(this).find('li').first().addClass('active');
        $(this).find('.tab-pane').first().addClass('active'); 
    });
}
};

/* ==================================================
	Testimonial Sliders
================================================== */

SKADI.testimonial = function(){
if($('.testimonial').length > 0 ){
	$(window).load(function() {
		$('.az-testimonials.flexslider').flexslider({
			animation:"horizontal",
			easing:"swing",
			controlNav: true, 
			reverse:false,
			smoothHeight:true,
			directionNav: false,
			animationSpeed: 400 
		});
	});
}
};

/* ==================================================
	Big Twitter Feeds Slider
================================================== */

SKADI.bigTweetSlide = function(){
if($('#twitter-feed-slide .slides').length > 0 ){
	$('#twitter-feed-slide').flexslider({
		animation:"fade",
		easing:"swing",
		controlNav: false, 
		reverse:false,
		smoothHeight:true,
		directionNav: false, 
		controlsContainer: '#twitter-feed-slide',
		animationSpeed: 400
	});
}
};

/* ==================================================
   Tooltip
================================================== */

SKADI.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
};

/* ==================================================
	Scroll to Top
================================================== */

SKADI.scrollToTop = function(){

	if( $('#back-to-top').length > 0 ) {
		var didScroll = false;
		var $arrow = $('#back-to-top');

		$(window).scroll(function() {
			didScroll = true;
		});

		setInterval(function() {
			if( didScroll ) {
				didScroll = false;

				if( $(window).scrollTop() > 1000 ) {
					$arrow.appear(function() {
						$(this).addClass('opened');
					});
				} else {
					$arrow.removeClass('opened');
				}
			}
		}, 250);

		$arrow.on('click', function(){
			$('body, html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
			return false;
		});
	}
};

/* ==================================================
   Responsive Video
================================================== */

SKADI.video = function(){
	$('.videoWrapper, .video-embed').fitVids();
};

/* ==================================================
	Custom Select
================================================== */

SKADI.customSelect = function(){
	if($('.selectpicker').length > 0){
		$('.selectpicker').selectpicker();
	}
};

/* ==================================================
   Count Number 
================================================== */

SKADI.count = function(){
	if($('.counter-number').length > 0 ){
		$('.output-number').each(function() {
			var delay = $(this).data('delay');
			$(this).appear(function() {
				$(this).delay(delay).queue(function(){
					$(this).find('.timer').countTo();
				});
	       	});
		});
	}
};

/* ==================================================
   MediaElements
================================================== */

SKADI.mediaElements = function(){

$('audio, video').each(function(){
    $(this).mediaelementplayer({
    // if the <video width> is not specified, this is the default
    defaultVideoWidth: 480,
    // if the <video height> is not specified, this is the default
    defaultVideoHeight: 270,
    // if set, overrides <video width>
    videoWidth: -1,
    // if set, overrides <video height>
    videoHeight: -1,
    // width of audio player
    audioWidth: 400,
    // height of audio player
    audioHeight: 50,
    // initial volume when the player starts
    startVolume: 0.8,
    // path to Flash and Silverlight plugins
    pluginPath: theme_objects.base + '/_include/js/mediaelement/',
    // name of flash file
    flashName: 'flashmediaelement.swf',
    // name of silverlight file
    silverlightName: 'silverlightmediaelement.xap',
    // useful for <audio> player loops
    loop: false,
    // enables Flash and Silverlight to resize to content size
    enableAutosize: true,
    // the order of controls you want on the control bar (and other plugins below)
    // Hide controls when playing and mouse is not over the video
    alwaysShowControls: false,
    // force iPad's native controls
    iPadUseNativeControls: false,
    // force iPhone's native controls
    iPhoneUseNativeControls: false,
    // force Android's native controls
    AndroidUseNativeControls: false,
    // forces the hour marker (##:00:00)
    alwaysShowHours: false,
    // show framecount in timecode (##:00:00:00)
    showTimecodeFrameCount: false,
    // used when showTimecodeFrameCount is set to true
    framesPerSecond: 25,
    // turns keyboard support on and off for this instance
    enableKeyboard: true,
    // when this player starts, it will pause other players
    pauseOtherPlayers: true,
    // array of keyboard commands
    keyActions: []
    });
});

$('.video-wrap video').each(function(){
    $(this).mediaelementplayer({
    	enableKeyboard: false,
        iPadUseNativeControls: false,
        pauseOtherPlayers: true,
        iPhoneUseNativeControls: false,
        AndroidUseNativeControls: false
    });

    if (navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/)) {
	    $(".video-section-container .mobile-video-image").show();
	    $(".video-section-container .video-wrap").remove()
	}
});

$(".video-section-container .video-wrap").each(function (b) {
	var min_w = 1500;
	var header_height = 0;
	var vid_w_orig = 1280;
	var vid_h_orig = 720;
    
    var f = $(this).closest(".video-section-container").outerWidth();
    var e = $(this).closest(".video-section-container").outerHeight();
    $(this).width(f);
    $(this).height(e);
    var a = f / vid_w_orig;
    var d = (e - header_height) / vid_h_orig;
    var c = a > d ? a : d;
    min_w = 1280 / 720 * (e + 20);
    if (c * vid_w_orig < min_w) {
        c = min_w / vid_w_orig
    }
    $(this).find("video, .mejs-overlay, .mejs-poster").width(Math.ceil(c * vid_w_orig + 2));
    $(this).find("video, .mejs-overlay, .mejs-poster").height(Math.ceil(c * vid_h_orig + 2));
    $(this).scrollLeft(($(this).find("video").width() - f) / 2);
    $(this).find(".mejs-overlay, .mejs-poster").scrollTop(($(this).find("video").height() - (e)) / 2);
    $(this).scrollTop(($(this).find("video").height() - (e)) / 2)
});

};

SKADI.resizeMediaElements = function(){
	var entryAudioBlog = $('.audio-thumb');
	var entryVideoBlog = $('.video-thumb');

	entryAudioBlog.each(function() { 
		$(this).css("width", $('article').width() + "px"); 
	}); 

	entryVideoBlog.each(function() { 
		$(this).css("width", $('article').width() + "px"); 
	}); 
};

/* ==================================================
	Menu Leave Page / Cache Back Button Reload
================================================== */

SKADI.leavePage = function(){
	$('header #logo a, #menu li a, .gn-menu li a').not('header #menu li a[href$="#"], header .gn-menu li a[href$="#"]').click(function(event){
		
		event.preventDefault();
		var linkLocation = this.href;

		$('.wrap_all').animate({'opacity' : 0}, 1000, 'easeOutExpo');
		
		$('body').fadeOut(500, function(){
			window.location = linkLocation;
		});      
	}); 
};

SKADI.reloader = function(){
	window.onpageshow = function(event) {
		if (event.persisted) {
			window.location.reload(); 
		}
	};	
};

/* ==================================================
	Animations Module
================================================== */

SKADI.animationsModule = function(){
	
	function elementViewed(element) {
		if (Modernizr.touch && $(document.documentElement).hasClass('no-animation-effects')) {
			return true;
		}
		var elem = element,
			window_top = $(window).scrollTop(),
			offset = $(elem).offset(),
			top = offset.top;
		if ($(elem).length > 0) {
			if (top + $(elem).height() >= window_top && top <= window_top + $(window).height()) {
				return true;
			} else {
				return false;
			}
		}
	};
	
	function onScrollInterval(){
		var didScroll = false;
		$(window).scroll(function(){
			didScroll = true;
		});
		
		setInterval(function(){
			if (didScroll) {
				didScroll = false;
			}
			
			if($('.animated-content').length > 0 ){
				$('.animated-content').each(function() {
					var currentObj = $(this);
					var delay = currentObj.data('delay');
					if (elementViewed(currentObj)) {
						currentObj.delay(delay).queue(function(){
							currentObj.addClass('animate');
						});
					}
				});
			}
		}, 250);
	};
	
	onScrollInterval();
};

/* ==================================================
   Social Share
================================================== */

SKADI.reloadSocial = function(){

	if( $('.fb-like').length > 0 || $('.twitter-share-button').length > 0 || $('.g-plusone').length > 0 || $('.pinterest-share').length > 0) {

	    //Twitter
	    if (typeof (twttr) != 'undefined') {
	        twttr.widgets.load();
	    } else {
	        $.getScript('http://platform.twitter.com/widgets.js');
	    }

	    //Facebook
	    if (typeof (FB) != 'undefined') {
	        FB.init({ status: true, cookie: true, xfbml: true });
	    } else {
	        $.getScript("http://connect.facebook.net/en_US/all.js#xfbml=1", function () {
	            FB.init({ status: true, cookie: true, xfbml: true });
	        });
	    }

	    // Pinterest
	    if (typeof (pinterest) != 'undefined') {
		    pinterest.widgets.load();
		} else {
			$.getScript('http://assets.pinterest.com/js/pinit.js');
		}
	  
	    //Google - Note that the google button will not show if you are opening the page from disk - it needs to be http(s)
	    if (typeof (gapi) != 'undefined') {
	        $(".g-plusone").each(function () {
	            gapi.plusone.render($(this).get(0));
	        });
	    } else {
	        $.getScript('https://apis.google.com/js/plusone.js');
	    }

	}
};


/* ==================================================
   Progress Bar Animated 
================================================== */

SKADI.progressBar = function(){
	if($('.bar.animable').length > 0 ){
		$('.bar.animable').each(function() {
	        var percent = $(this).data('percent');
	        $(this).appear(function() {
	       		$(this).animate({width: percent+'%'},1000, 'easeOutExpo');
	       	});    
	    });
	}
};

/* ==================================================
   Social Buttons Style Overlay 
================================================== */

SKADI.socialBtnOverlay = function(){
	if($('#social-btn-header').length > 0 ){
		var delay = $('#social-btn-header').data('delay');

		if( $.browser.opera ){ // Opera Fix
			$('#socialBtnProfile').on('show.bs.modal', function () {
			  	$('.social-content.center .cube-animation').each(function(i) {
	    			$(this).delay((i++) * delay).queue(function() {
	                   $(this).addClass('animate');
	               }); 
	    		});
			});
		} else {
			$('#socialBtnProfile').on('show.bs.modal', function () {
			  	$('.social-content.center .cube-animation').each(function(i) {
	    			$(this).delay((i++) * delay).queue(function() {
	                   $(this).addClass('animate');
	                   $(this).dequeue();
	               }); 
	    		});
			});

			$('#socialBtnProfile').on('hidden.bs.modal', function () {
			  	$('.social-content.center .cube-animation').stop().removeClass('animate');
			});
		}
	}
};

/* ==================================================
	Full Screen Section
================================================== */

SKADI.fullSection = function(){
	if($('.section-full-area').length > 0 ){
		$('.section-full-area').each(function(){
			var windowWidth = $(window).width();
	
			if( windowWidth >= 1024 ) {
				if ($('.section-full-area').hasClass('small-view')) {
					$('.section-full-area').removeClass('small-view');
				}
				$('.section-full-area').addClass('big-view');

				var position = $('header').css("position");
				var headerH = $('header').height();
				var vpw = $(window).width();
				var vph = $(window).height() - headerH;
				var vphr = $(window).height();

			    $('.section-full-area').css({'height': vph + 'px'});

			    if (position=="relative") {
			    	$(".section-full-area:first").nextAll('.section-full-area').css({'height': vphr + 'px'});
			    }
			} else {
				if ($('.section-full-area').hasClass('big-view')) {
					$('.section-full-area').removeClass('big-view');
				}
				$('.section-full-area').addClass('small-view');
				$('.section-full-area').css("height", "auto");
			}
		});
	}
};

SKADI.scrllBTN = function(){
	//if($('.scroll-btn').length > 0 ){
		$('.scroll-btn').on('click', function() {

			var num = '';
			var headerH = $('header').height();
			if ($('header').css("position") === "fixed") {
	            num = headerH;
	        } else {
	        	num = 0;
	        }

		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
		        || location.hostname == this.hostname) {

		        var target = $(this.hash);
		        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		           if (target.length) {
		            $('html,body').animate({
		                 scrollTop: target.offset().top - num
		            }, 1000, 'easeOutExpo');
		            return false;
		        }
		    }
		});
	//}
};

SKADI.scrllTEXT = function(){
  //if($('.scroll-btn').length > 0 ){
  $('.scroll-text').on('click', function() {

    var num = '';
    var headerH = $('header').height();
    if ($('header').css("position") === "fixed") {
      num = headerH;
    } else {
      num = 0;
    }

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top - num
        }, 1000, 'easeOutExpo');
        return false;
      }
    }
  });
  //}
};

/* ==================================================
	Google Maps Shortcodes
================================================== */

SKADI.googleMaps = function(){
	if($('.az-map').length > 0)
	{

		$('.az-map').each(function(i,e){

			var $map = $(e);
			var $map_id = $map.attr('id');
			var $map_lat = $map.attr('data-map-lat');
			var $map_lon = $map.attr('data-map-lon');
			var $map_zoom = parseInt($map.attr('data-map-zoom'));
			var $map_title = $map.attr('data-map-title');
			var $map_marker_img = $map.attr('data-map-pin');
			var $map_info = $map.attr('data-map-info');

			var $map_hue = $map.attr('data-map-color');
			var $map_saturation = $map.attr('data-map-saturation');
			var $map_lightness = $map.attr('data-map-lightness');

			var $map_scroll = $map.data('map-scroll');
			var $map_drag 	= $map.data('map-drag');
			var $map_zoom_control = $map.data('map-zoom-control');
			var $map_disable_doubleclick = $map.data('map-double-click');
			var $map_disable_default_ui = $map.data('map-default');
			
			
			
			var latlng = new google.maps.LatLng($map_lat, $map_lon);			
			var options = { 
				scrollwheel: $map_scroll,
				draggable: $map_drag, 
				zoomControl: $map_zoom_control,
				disableDoubleClickZoom: $map_disable_doubleclick,
				disableDefaultUI: $map_disable_default_ui,
				zoom: $map_zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var styles = [ 
							{
								stylers: [
									{ hue: $map_hue }, // Inser Your Hue Color
								  	{ saturation: $map_saturation },
								  	{ lightness: $map_lightness }
								]
							  	},{
									featureType: "road",
									elementType: "geometry",
									stylers: [
										{ lightness: 50 },
								  		{ saturation: 0 },
								  		{ visibility: "simplified" }
									]
							  	},{
									featureType: "road",
									elementType: "labels",
									stylers: [
								  		{ visibility: "on" }
									]
								}
							];
			
			var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
			
			var map = new google.maps.Map(document.getElementById($map_id), options);
		
			var image = $map_marker_img;
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				title: $map_title,
				icon: image
			});
			
			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');
			
			var contentString = $map_info;
       
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			
			google.maps.event.addListener(marker, 'click', function() {
      			infowindow.open(map,marker);
    		});

		});
	}
};

SKADI.rowElemAut = function() {
	var windowWidth = $(window).width();
	if( windowWidth >= 1024 ) {
		if($('.row.content-full-screen.center-layout').length > 0) {
			$('.row.content-full-screen.center-layout').each(function(){
				var elem = $(this);
				var colH = elem.height();
				var colW = elem.width();
		    	elem.css({'width': colW + 'px', 'height': colH + 'px', 'margin-top': -colH/2 + 'px', 'margin-left': -colW/2 + 'px'});
			});
		}
		
		$('.row.content-full-screen').each(function(){
			var elem = $(this);
			var colH = elem.height();
		    elem.css({'height': colH + 'px', 'margin-top': -colH/2 + 'px'});
		});
	} else {
		$('.row.content-full-screen').css({"height": "auto", "margin-top": "auto"});
		$('.row.content-full-screen.center-layout').css({"width": "100%", "height": "auto", "margin-left": "auto", "margin-top": "auto"});
	}
};

/* ==================================================
	Init
================================================== */

$(window).load(function(){
	if($('.animation-enabled').length > 0 ){
		SKADI.leavePage();
	}
	SKADI.rowElemAut();
});

$(document).ready(function(){
	// Animation Transition Preload Page
	if($('.animation-enabled').length > 0 ){
		
		SKADI.reloader();
		
		$('body').jpreLoader({
			splashID: "#jSplash",
			showSplash: true,
			showPercentage: false,
			autoClose: true,
			splashFunction: function() {
				$('#container').delay(50).animate({'opacity' : 1}, 100, 'linear');
			}
		}, function() {				
			$('.wrap_all').delay(50).animate({'opacity' : 1}, 1000, 'easeOutExpo');
		});
	}

	// Set Portfolio Thumbnails Size
	if($('.list-portfolio .item-project').length > 0 ){
		$(".list-portfolio .item-project").imagesLoaded(function() {
	        $(".list-portfolio .item-project").each(function () {
		        var e = $(".project-name", this).height(),
		            t = $(".project-name", this).width();
		        $(".project-name .va", this).css("height", e).css("width", t)
		    });
	    });
	}

	SKADI.fullSection();
	SKADI.rowElemAut();
	SKADI.scrllBTN();
	SKADI.scrllTEXT();
	SKADI.animationsModule();
	SKADI.mediaElements();
	SKADI.resizeMediaElements();
	SKADI.video();
	SKADI.dropDown();
	SKADI.masonryBlog();
	SKADI.people();
	SKADI.portfolio();
	SKADI.mobileNav();
	SKADI.mobileMenu();
	SKADI.listenerMenu();
	SKADI.subMenu();
	SKADI.creativeMenu();
	SKADI.accordion();
	SKADI.toggle();
	SKADI.tabs();
	SKADI.testimonial();
	SKADI.bigTweetSlide();
	SKADI.circularGraph();
	SKADI.toolTip();
	SKADI.fancyBox();
	SKADI.customSelect();
	SKADI.count();
	SKADI.progressBar();
	SKADI.googleMaps();
	SKADI.scrollToTop();
	SKADI.reloadSocial();
	SKADI.socialBtnOverlay();
});

$(window).resize(function(){
	SKADI.fullSection();
	SKADI.rowElemAut();
	SKADI.mobileNav();
	SKADI.resizeMediaElements();

	// Resize Portfolio Thumbnails Size
	if($('.list-portfolio .item-project').length > 0 ){
	    $(".list-portfolio .item-project").each(function () {
	        var e = $(".project-name", this).height(),
	            t = $(".project-name", this).width();
	        $(".project-name .va", this).css("height", e).css("width", t)
	    });
	}

	// Resize Video Background
	$(".video-section-container .video-wrap").each(function (b) {
		var min_w = 1500;
		var header_height = 0;
		var vid_w_orig = 1280;
		var vid_h_orig = 720;
	    
	    var f = $(this).closest(".video-section-container").outerWidth();
	    var e = $(this).closest(".video-section-container").outerHeight();
	    $(this).width(f);
	    $(this).height(e);
	    var a = f / vid_w_orig;
	    var d = (e - header_height) / vid_h_orig;
	    var c = a > d ? a : d;
	    min_w = 1280 / 720 * (e + 20);
	    if (c * vid_w_orig < min_w) {
	        c = min_w / vid_w_orig
	    }
	    $(this).find("video, .mejs-overlay, .mejs-poster").width(Math.ceil(c * vid_w_orig + 2));
	    $(this).find("video, .mejs-overlay, .mejs-poster").height(Math.ceil(c * vid_h_orig + 2));
	    $(this).scrollLeft(($(this).find("video").width() - f) / 2);
	    $(this).find(".mejs-overlay, .mejs-poster").scrollTop(($(this).find("video").height() - (e)) / 2);
	    $(this).scrollTop(($(this).find("video").height() - (e)) / 2)
	});
});

});