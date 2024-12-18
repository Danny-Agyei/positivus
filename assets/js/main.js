$(document).ready(function () {
  const navToggleBtn = $(".js-toggle");
  const accordionBtns = $(".js-accordion-toggle");
  const navbar = $(".js-nav");
  const accordItems = $(".js-process-item");
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
    const accordItemName = $(this).attr("data-target");
    const accordItem = $(`[data-name=${accordItemName}]`)[0];

    $(this).click(function () {
      if ($(accordItem).hasClass(PROCESS_ITEM_OPEN_CLASS)) {
        accordItems.removeClass(PROCESS_ITEM_OPEN_CLASS);
        accordionBtns.attr("aria-expanded", false);

        return;
      }

      accordItems.removeClass(PROCESS_ITEM_OPEN_CLASS);
      accordionBtns.attr("aria-expanded", false);

      $(accordItem).addClass(PROCESS_ITEM_OPEN_CLASS);
      $(this).attr("aria-expanded", true);
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
      center: true,
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
      margin: 20,
      loop: false,
      center: true,
      nav: true,
      dots: true,
      navText: [
        '<i class="fa-solid fa-arrow-left" aria-hidden="true"></i>',
        '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      ],
      responsive: {
        375: {
          margin: 30,
          center: false,
        },
        768: {
          items: 1,
          margin: 30,
        },
        992: {
          items: 2,
          loop: true,
          margin: 50,
          center: true,
          autoWidth: true,
        },
        1400: {
          items: 2,
          center: true,
          autoWidth: true,
          loop: true,
          margin: 50,
        },
      },
    },
  };

  $(window).resize(startCarousel);

  startCarousel();

  function startCarousel() {
    const deviceScreenSize = $(window).width();

    [...allSliders].forEach((elem) => {
      const sectionName = $(elem).attr("data-name");
      let activeCarouselOptions = { ...options[sectionName] };

      // Disable Case carousel on large screen
      if (deviceScreenSize > 990 && caseSlider.hasClass("owl-carousel")) {
        caseSlider.trigger("destroy.owl.carousel");
        activeCarouselOptions = { ...options["testimonials"] };
      }

      $(elem).owlCarousel({
        items: 1,
        autoHeight: true,
        autoplayHoverPause: true,
        ...activeCarouselOptions,
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

  // Initialize Lenis
  const lenis = new Lenis({
    autoRaf: true,
  });
});
