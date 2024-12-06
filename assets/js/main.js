$(document).ready(function () {
  const navToggleBtn = $(".js-toggle");
  const navbar = $(".js-nav");

  // Navbar mobile menu toggler
  navToggleBtn.click(handleMenuToggle);

  function handleMenuToggle() {
    navToggleBtn.toggleClass("header__menu--active");
    navbar.toggleClass("header__nav--open");
  }
});
