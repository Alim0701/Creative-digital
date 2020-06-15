$(document).ready(function () {
  const hamburger = $(".hamburger");
  const hamburgerMenu = $(".hamburger__menu");

  hamburger.on("click", () => {
    hamburger.toggleClass("hamburger_active");
    hamburgerMenu.toggleClass("hamburger__menu_active");
    $(".promo").toggleClass("promo_active");

    if (hamburger.hasClass("hamburger_active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
});
