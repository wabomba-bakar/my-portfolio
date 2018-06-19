 /***********************************/
 /*          Contact Form           */
 /***********************************/

 const name = document.getElementById('name');
 const email = document.getElementById('email');
 const message = document.getElementById('message');
 const button = document.getElementById('button');
 const response = document.querySelector('.response');

 function send() {
     const name = nameInput.value,
         email = emailInput.value,
         message = messageInput.value;


     fetch('/', {
             method: 'post',
             headers: {
                 'Content-type': 'application/json'
             },
             body: JSON.stringify({ name: name, email: email, message: message })
         })
         .then(res => {
             console.log(res);
         })
         .catch(err => {
             console.log(err);
         })
 }


 jQuery(window).load(function() {
     // USE STRICT
     "use strict";
     /***********************************/
     /*            Preloader            */
     /***********************************/
     jQuery(".Baker-preloader").fadeOut(500);
     /***********************************/
     /*        Portfolio  Isotope       */
     /***********************************/
     if ($('.work-items').length) {
         var $elements = $('.work-items');
         $elements.isotope();
         $('.portfolio-filter ul li').on('click', function() {
             $('.portfolio-filter ul li').removeClass('sel-item');
             $(this).addClass('active-item');
             var selector = $(this).attr('data-filter');
             $(".work-items").isotope({
                 filter: selector,
                 animationOptions: {
                     duration: 750,
                     easing: 'linear',
                     queue: false,
                 }
             });
         });
     }
     /***********************************/
     /*     Scroll To Part of Page      */
     /***********************************/
     $("a").on('click', function(event) {
         // USE STRICT
         "use strict";
         if (this.hash !== "") {
             var hash = this.hash;
             $('html, body').animate({
                 scrollTop: $(hash).offset().top
             }, 800, function() {
                 window.location.hash = hash;
             });
             event.preventDefault();
         }
     });
     /***********************************/
     /* Close Mobile Menu on Side Click */
     /***********************************/
     $('.nav-btn').on('click', function() {
         $('.collapse').collapse('hide');
         $("#menu-nav-btn").toggleClass("active");
     });
     /***********************************/
     /*            Menu icon            */
     /***********************************/
     $('#menu-nav-btn').on('click', function() {
         // USE STRICT
         "use strict";
         if ($('#menu-nav-btn').attr('aria-expanded') === "false") {
             $('#menu-nav-btn').addClass('active');
         } else if ($('#menu-nav-btn').attr('aria-expanded') === "true") {
             $('#menu-nav-btn').removeClass('active');
         }
     });
     /***********************************/
     /*        Initalise wow.js         */
     /***********************************/
     $(function() {
         // USE STRICT
         "use strict";
         new WOW().init();
     });
 });
 /***********************************/
 /*    Shrink Navbar After Scroll   */
 /***********************************/
 $(window).scroll(function() {
     // USE STRICT
     "use strict";
     if ($(document).scrollTop() > 70) {
         $('.navbar-default').addClass('shrink');
     } else {
         $('.navbar-default').removeClass('shrink');
     }
 });