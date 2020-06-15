$(document).ready(function () {
  function scrollToSection() {
    const href = $(this).attr("href");

    $("html, body").animate(
      {
        scrollTop: $(href).offset().top,
      },
      700
    );

    $("body").css({
      overflow: "",
    });

    $(".promo").removeClass("promo_active");
    $(".hamburger").removeClass("hamburger_active");
    $(".hamburger__menu").removeClass("hamburger__menu_active");
  }

  // scroll nav
  $(".nav a").on("click", scrollToSection);

  // scroll arrow
  $(".scroll__link").on("click", scrollToSection);

  // scroll hamburger nav
  $(".hamburger__nav a").on("click", scrollToSection);
});
