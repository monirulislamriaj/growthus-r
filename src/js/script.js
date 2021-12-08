$(document).ready(function () {
  "use strict";
  
  //Copyright Year
  var copyrightYear = document.getElementById('copyrightYear');
  copyrightYear.innerHTML = new Date().getFullYear();
  
  //  AOS Initialize
  AOS.init();

  $(window).on("scroll", function () {
    var windscroll = $(window).scrollTop();
    if (windscroll >= 100) {
      $("#navigationBar").addClass("sticky-nav");
    } else {
      $("#navigationBar").removeClass("sticky-nav");
    }
  });

  // Background Shape Switches
  TweenMax.fromTo(
    ".switch",
    2,
    { opacity: 1 },
    { opacity: 0.3, repeat: -1, yoyo: true, ease: Power2.easeInOut }
  );
  TweenMax.fromTo(
    ".switch-two",
    2,
    { y: 0 },
    { y: 10, repeat: -1, yoyo: true, ease: Power2.easeInOut }
  );
  TweenMax.fromTo(
    ".switch-three",
    2,
    { x: 0 },
    { x: 10, repeat: -1, yoyo: true, ease: Power2.easeInOut }
  );

  // Review Slider
  $(".testimonials-slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    // centerMode: true,
    //centerPadding: "80px",
    autoplay: false,
    speed: 500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
         // centerMode: false,
          autoplay: false,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: true,
          infinite: false,
        },
      },
    ],
  });

  //Testimonial slider 2
  $(".testimonials-sliderTwo").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
    speed: 500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
          autoplay: false,
          infinite: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          autoplay: true,
          infinite: false,
        },
      },
    ],
  });

  //counter-up
  $(".counter").counterUp({});

  //smooth Scroll
  // Add smooth scrolling to all links
  $(".service-topTobottom").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top - 120
      }, 10, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  //Load More Js
  $(function(){
    $(".loading-item").slice(0, 4).show(); //showing 4 div
  
    $(".load-more").on("click",function(){
      $(".loading-item:hidden").slice(0, 2).show(1000, 'linear'); //showing 2 hidden div on click
  
      if($(".loading-item:hidden").length ==0)
      {
        $(".load-more").fadeOut(); //this will hide
        //button when length is 0
      }
    })
  });

  
  //****************************
  // Isotope Load more button
  //****************************
  // init Isotope
  var initial_items = 6;
  var next_items = 2;
  var $grid = $('#grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'masonry',
      stamp: '.element-item--static'
  });


  // bind filter button click
  $('.button-group-home').on('click', 'button', function () {
      var filterValue = $(this).attr('data-filter');
      // use filterFn if matches value
      $grid.isotope({filter: filterValue});
      updateFilterCounts();
  });
  function updateFilterCounts() {
      // get filtered item elements
      var itemElems = $grid.isotope('getFilteredItemElements');
      var count_items = $(itemElems).length;
    
      if (count_items > initial_items) {
          $('#showMore').show(1000, 'linear');
      }
      else {
          $('#showMore').hide(1000, 'linear');
      }
      if ($('.element-item').hasClass('visible_item')) {
          $('.element-item').removeClass('visible_item');
      }
      var index = 0;

      $(itemElems).each(function () {
          if (index >= initial_items) {
              $(this).addClass('visible_item');
          }
          index++;
      });
      $grid.isotope('layout');
  }
  // change is-checked class on buttons
  $('.button-group-home').each(function (i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('click', 'button', function () {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $(this).addClass('is-checked');
      });
  });

  function showNextItems(pagination) {
      var itemsMax = $('.visible_item').length;
      var itemsCount = 0;
      $('.visible_item').each(function () {
          if (itemsCount < pagination) { $(this).removeClass('visible_item'); itemsCount++; } }); if (itemsCount >= itemsMax) {
          $('#showMore').hide(1000, 'linear');
      }
      $grid.isotope('layout');
  }
  // function that hides items when page is loaded
  function hideItems(pagination) {
      var itemsMax = $('.element-item').length;
      var itemsCount = 0;
      $('.element-item').each(function () {
          if (itemsCount >= pagination) {
              $(this).addClass('visible_item');
          }
          itemsCount++;
      });
      if (itemsCount < itemsMax || initial_items >= itemsMax) {
          $('#showMore').hide(1000, 'linear');
      }
      $grid.isotope('layout');
  }
  $('#showMore').on('click', function (e) {
      e.preventDefault();
      showNextItems(next_items);
  });
  hideItems(initial_items);

  //  //File upload 
   const actualBtn = document.getElementById('file-input');
   const fileChosen = document.getElementById('file-chosen');
   actualBtn.addEventListener('change', function(){
     fileChosen.textContent = this.files[0].name
   })
});
