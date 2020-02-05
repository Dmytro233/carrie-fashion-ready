$(document).ready(function() {
  "use strict";

  // Select a main picture and top-picture
  $(".product .item-image").on("click", function() {
    var imgPath = $(this).attr("data-img-path");
    var imgPosition = $(this).attr("data-top-position");
    var imgPathLarge = imgPath.slice(0, -4) + "-large" + imgPath.slice(-4);

    $(".image img").css("top", imgPosition);
    $(".image img").attr("src", imgPathLarge);

    $(".selected-product img").css("top", imgPosition);
    $(".selected-product img").attr("src", imgPath);
  });

  // Swich logo when header fixed
  if ($(window).width() > 575) {
    $(window).scroll(function() {
      if ($(window).scrollTop() > 40) {
        $("nav.navbar .navbar-brand img").css("max-height", "150px");
        $("a.logo").css("display", "none");
        $("a.logo-product").css("display", "block");
      } else {
        $("nav.navbar .navbar-brand img").css({
          "max-height": "100px",
          "padding-top": "5px",
          "padding-bottom": "5px"
        });
        $("a.logo").css("display", "block");
        $("a.logo-product").css("display", "none");
      }
    });
  } else {
    $("nav.navbar .navbar-brand img").css({
      "max-height": "50px"
    });
    $(window).scroll(function() {
      if ($(window).scrollTop() > 40) {
        $("nav.navbar .navbar-brand img").css("max-height", "75px");
        $(".selected-product").css({
          height: "50px",
          width: "170px",
          overflow: "hidden"
        });
        $(".top-description").css({
          top: "0",
          "margin-left": "5px"
        });
        $("a.logo").css("display", "none");
        $("a.logo-product").css("display", "block");
      } else {
        $("nav.navbar .navbar-brand img").css({
          "max-height": "50px"
        });
        $("a.logo").css("display", "block");
        $("a.logo-product").css("display", "none");
      }
    });
  }

  // Scroll to contact after click "Купить"
  $(".go-to-form").click(function() {
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 86
      },
      1000
    );
  });

  // Add size to form
  $("#chose-size").on("change", function() {
    var size = $(this).val();
    $("#size").val(size);
    $(".selected-size-form").text(`Размер: ${size}`);
  });

  // Add color to form
  $("#chose-color").on("change", function() {
    var color = $(this).val();
    $("#color").val(color);
    $(".selected-color-form").text(`Цвет: ${color}`);
  });

  // Add count to form
  $(".minus-btn").click(function() {
    if (parseInt($("#chose-count").val(), 10) >= 1) {
      $("#chose-count").val(parseInt($("#chose-count").val(), 10) - 1);
      $("#count").val($("#chose-count").val());
    }
  });
  $(".plus-btn").click(function() {
    $("#chose-count").val(parseInt($("#chose-count").val(), 10) + 1);
    $("#count").val($("#chose-count").val());
  });

  // Add model to form
  $("#model").val($("#navigation li[class='active'] a").attr("href"));

  // Add shadow for navbar & show/hide scroll to top btn
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $("nav.navbar").addClass("active");
    } else {
      $("nav.navbar").removeClass("active");
    }

    if ($(window).scrollTop() > 1000) {
      $("#scrollTop").fadeIn();
    } else {
      $("#scrollTop").fadeOut();
    }

    function makeItFixed(x) {
      if ($(window).scrollTop() >= x) {
        $("nav.navbar").addClass("fixed-top");
        $("section.hero, section.home-hero").addClass("is-fixed");
      } else {
        $("nav.navbar").removeClass("fixed-top");
        $("section.hero, section.home-hero").removeClass("is-fixed");
      }
    }

    if ($(window).outerWidth() >= 992) {
      makeItFixed(40);
    }

    if ($(window).outerWidth() < 992) {
      makeItFixed(0);
    }
  });

  // Scroll to top on click
  $("#scrollTop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  // Bootstrap Select initialization
  $(".selectpicker").selectpicker();

  // Products Slider
  $(".products-slider").owlCarousel({
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
      "<i class='fa fa-angle-right'></i>"
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 4,
        nav: true,
        loop: false
      }
    }
  });

  // Contact Form
  $("input, textarea").focus(function() {
    $(this)
      .siblings("label")
      .addClass("active");
    $(this).addClass("active");
  });
  $("input, textarea").blur(function() {
    $(this)
      .siblings("label")
      .removeClass("active");
    $(this).removeClass("active");
  });

  // check if the input has a value
  $("input, textarea").blur(function() {
    if ($(this).val().length > 0) {
      $(this)
        .siblings("label")
        .addClass("active");
    } else {
      $(this)
        .siblings("label")
        .removeClass("active");
    }
  });

  // Lightbox initialization
  lightbox.option({
    resizeDuration: 400,
    fadeDuration: 400,
    alwaysShowNavOnTouchDevices: true
  });

  // Add to cart popup
  $("a.expand").click(function(event) {
    event.preventDefault();
    $("body").css("overflow", "hidden");

    var imgPath = $(this)
      .children("img")
      .attr("src");
    $(".item-profile img").attr("src", imgPath);

    var popupId = $(this).attr("data-target"),
      popUpOverlay = $(popupId),
      popUpWindow = popUpOverlay.find(".cart-popup");

    popUpOverlay.fadeIn();
    popUpOverlay.addClass("active");

    setTimeout(function() {
      popUpWindow.addClass("fade-in-up").addClass("active");
    }, 200);
  });

  $(".cart-popup-overlay .close-btn").click(function() {
    $(".cart-popup-overlay.active")
      .fadeOut()
      .removeClass("active");
    $(".cart-popup.active")
      .removeClass("fade-in-up")
      .removeClass("active");
    $("body").css("overflow", "auto");
  });

  // Contact form validation
  $("#contact-form").validate({
    messages: {
      name: "please enter your name",
      number: "please enter your phone number",
      people: "please enter how many people",
      date: "please enter booking date",
      time: "please enter booking time",
      request: "please enter your special request"
    }
  });

  // For demo purposes, can be deleted
  var stylesheet = $("link#theme-stylesheet");
  $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
  var alternateColour = $("link#new-stylesheet");

  if ($.cookie("theme_csspath")) {
    alternateColour.attr("href", $.cookie("theme_csspath"));
  }

  $("#colour").change(function() {
    if ($(this).val() !== "") {
      var theme_csspath = "css/style." + $(this).val() + ".css";

      alternateColour.attr("href", theme_csspath);

      $.cookie("theme_csspath", theme_csspath, {
        expires: 365,
        path: document.URL.substr(0, document.URL.lastIndexOf("/"))
      });
    }

    return false;
  });
});
