$(document).ready(function () {
  const navToggleBtn = $(".js-toggle");
  const accordionBtns = $(".js-accordion-toggle");
  const navbar = $(".js-nav");
  const allCarousels = $(".js-carousel");

  // Navbar mobile menu toggler
  const MENU__BTN_ACTIVE_CLASS = "header__menu--active";
  const NAV_MENU_OPEN_CLASS = "header__nav--open";

  navToggleBtn.click(handleMenuToggle);

  function handleMenuToggle() {
    navToggleBtn.toggleClass(MENU__BTN_ACTIVE_CLASS);
    navbar.toggleClass(NAV_MENU_OPEN_CLASS);
  }

  // Process Accordion handler
  const PROCESS_ITEM_OPEN_CLASS = "process__item--open";

  accordionBtns.each(handleAccordionToggle);

  function handleAccordionToggle() {
    const targetName = $(this).attr("data-target");

    const targetElem = $(`[data-name=${targetName}]`)[0];

    $(this).click(() => {
      $(targetElem).toggleClass(PROCESS_ITEM_OPEN_CLASS);
    });
  }

  // Owl carousel config
  [...allCarousels].forEach((elem) => {
    const sectionName = $(elem).attr("data-name");

    const options = {
      case: {
        responsiveClass: true,
        autoPlayTimeout: 1000,
        autoplaySpeed: 1800,
        smartSpeed: 800,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
          768: {
            margin: 10,
            items: 2,
          },
        },
      },
      testimonials: {
        responsiveClass: true,
        autoPlayTimeout: 1000,
        autoplaySpeed: 1800,
        smartSpeed: 800,
        margin: 0,
        nav: true,
        dots: false,
        navText: [
          '<i class="fa fas-left-arrow" aria-hidden="true"></i>',
          '<i class="fa fas-right-arrow" aria-hidden="true"></i>',
        ],
        responsive: {
          768: {
            nav: true,
            items: 2,
            margin: 50,
          },
        },
      },
    };

    $(elem).owlCarousel({
      center: true,
      items: 1,
      loop: true,
      autoplay: true,
      autoHeight: true,
      autoplayHoverPause: true,
      ...options[sectionName],
    });
  });
});
