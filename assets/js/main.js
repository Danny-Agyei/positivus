$(document).ready(function () {
  const navToggleBtn = $(".js-toggle");
  const accordionBtns = $(".js-accordion-toggle");
  const navbar = $(".js-nav");
  const allSliders = $(".js-slider");
  const caseSlider = $(".js-case-slider");
  const testOwl = $(".js-testimonials-slider");
  const testOwlDot = $(".js-testimonails-dot");

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
  const options = {
    case: {
      responsiveClass: true,
      autoPlayTimeout: 1000,
      autoplaySpeed: 1800,
      smartSpeed: 800,
      margin: 0,
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      responsive: {
        768: {
          margin: 10,
          items: 2,
        },
        992: {
          item: 1,
          margin: 0,
          autoplay: false,
        },
      },
    },
    testimonials: {
      responsiveClass: true,
      autoPlayTimeout: 1000,
      autoplaySpeed: 1800,
      smartSpeed: 800,
      autoplay: false,
      margin: 0,
      loop: false,
      nav: true,
      dots: true,
      navText: [
        '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      ],
      responsive: {
        768: {
          items: 2,
          margin: 50,
        },
        992: {
          items: 2,
          margin: 50,
        },
      },
    },
  };

  $(window).resize(startCarousel);

  startCarousel();

  function startCarousel() {
    const screenWidth = $(window).width();

    [...allSliders].forEach((elem) => {
      const sectionName = $(elem).attr("data-name");
      let availableCarousel = { ...options[sectionName] };

      // Disable Case carousel on large screen
      if (screenWidth > 990 && caseSlider.hasClass("owl-carousel")) {
        caseSlider.trigger("destroy.owl.carousel");
        availableCarousel = { ...options["testimonials"] };
      }

      $(elem).owlCarousel({
        center: true,
        items: 1,
        autoHeight: true,
        autoplayHoverPause: true,
        ...availableCarousel,
      });
    });
  }

  // Handle custom carousel dots trigger
  testOwlDot.click(function () {
    testOwl.trigger("to.owl.carousel", [$(this).index()]);
  });

  // Add active class to next custom dot
  testOwl.on("changed.owl.carousel", function (event) {
    let index = event.page.index;

    testOwlDot.removeClass("active");

    testOwlDot.each(() => {
      testOwlDot.eq(index).addClass("active");
    });
  });
});
