(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

  // Initialize navbar logo visibility on page load
    function initNavbarLogo() {
        var scrollPos = $(window).scrollTop();
        var heroSectionHeight = $('#hero-area').outerHeight();
        var navbarHeight = $('.scrolling-navbar').outerHeight();
        var $navbarContainer = $('.navbar .container');
        
        if (scrollPos < heroSectionHeight - navbarHeight) {
            $('.navbar-brand').hide();
            $navbarContainer.addClass('center-menu');
        } else {
            $('.navbar-brand').show();
            $navbarContainer.removeClass('center-menu');
        }
    }
    
    // Call the function on page load
    initNavbarLogo();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /* ==========================================================================
       countdown timer
       ========================================================================== */
     jQuery('#clock').countdown('2025/09/27',function(event){
      var $this=jQuery(this).html(event.strftime(''
      +'<div class="time-entry days"><span>%-D</span> <b>:</b> Days</div> '
      +'<div class="time-entry hours"><span>%H</span> <b>:</b> Hours</div> '
      +'<div class="time-entry minutes"><span>%M</span> <b>:</b> Minutes</div> '
      +'<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
    });

    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

      /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });
    wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    $('.lightbox').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
      });

    // Custom smooth scroll navigation with dynamic offset
    $('.navbar-nav a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = $(this).attr('href');
        var $target = $(target);
        
        if ($target.length) {
            var navbarHeight = $('.scrolling-navbar').outerHeight();
            var offsetTop = $target.offset().top - navbarHeight - 20;
            
            $('html, body').animate({
                scrollTop: offsetTop
            }, 800, 'easeInOutQuart');
            
            // Update active class
            $('.navbar-nav a').removeClass('active');
            $(this).addClass('active');
            
            // Close mobile menu if open
            if ($('.navbar-collapse').hasClass('show')) {
                $('.navbar-collapse').collapse('hide');
            }
        }
    });
    
    // Update active menu item on scroll and control navbar logo visibility
    $(window).scroll(function() {
        var scrollPos = $(window).scrollTop();
        var navbarHeight = $('.scrolling-navbar').outerHeight();
        var heroSectionHeight = $('#hero-area').outerHeight();
        var $navbarContainer = $('.navbar .container');
        
        // Hide/show navbar logo based on scroll position
        if (scrollPos < heroSectionHeight - navbarHeight) {
            // We're in the hero section, hide the logo and center menu
            $('.navbar-brand').fadeOut(300);
            $navbarContainer.addClass('center-menu');
        } else {
            // We're past the hero section, show the logo and restore normal layout
            $('.navbar-brand').fadeIn(300);
            $navbarContainer.removeClass('center-menu');
        }
        
        $('.navbar-nav a[href^="#"]').each(function() {
            var target = $(this).attr('href');
            var $target = $(target);
            
            if ($target.length) {
                var sectionTop = $target.offset().top - navbarHeight - 50;
                var sectionBottom = sectionTop + $target.outerHeight();
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.navbar-nav a').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
    }); 

    /* Counter
    ========================================================*/
    $('.counterUp').counterUp({
     delay: 10,
     time: 1500
    });

    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

  });      

}(jQuery));