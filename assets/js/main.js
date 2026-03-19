/**
 * Main JavaScript for Deimar Gutierrez - Virtual CFO website
 * Handles preloader, scroll effects, mobile navigation, FAQ toggles, and third-party integrations.
 */
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /* ==================================================
   * Preloader – removes the loading animation after page load
   * ================================================== */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /* ==================================================
   * Scroll to top button – appears after scrolling 100px
   * ================================================== */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /* ==================================================
   * Sticky header effect – adds .scrolled class to body when page is scrolled
   * Used for changing header appearance (e.g., background color)
   * ================================================== */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader) return;
    // Only apply if header has one of the sticky-related classes
    if (!selectHeader.classList.contains('scroll-up-sticky') && 
        !selectHeader.classList.contains('sticky-top') && 
        !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /* ==================================================
   * Scroll‑up sticky header – hides header when scrolling down, shows when scrolling up
   * Applies only to headers with .scroll-up-sticky class
   * ================================================== */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader || !selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      // Scrolling down past header height → hide header (move it up)
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${selectHeader.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      // Scrolling up but still past header height → show header at top
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      // At the very top → remove sticky positioning
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /* ==================================================
   * Mobile navigation toggle – opens/closes the menu on small screens
   * ================================================== */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToggle);
  }

  /**
   * Close mobile menu when a navigation link is clicked (same‑page links)
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle dropdown menus in mobile view when the arrow icon is clicked
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        if (this.parentNode.nextElementSibling) {
          this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        }
        e.stopImmediatePropagation();
      }
    });
  });

  /* ==================================================
   * Smooth scroll to section when page loads with a hash in the URL
   * (e.g., example.com/#about)
   * ================================================== */
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || 0),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /* ==================================================
   * GLightbox initialisation – for lightbox galleries
   * ================================================== */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /* ==================================================
   * PureCounter initialisation – for animated number counters
   * ================================================== */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /* ==================================================
   * Isotope layout initialisation – for filterable portfolio/grids
   * ================================================== */
  function initIsotopeLayout() {
    if (typeof Isotope === 'undefined') return;
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          // Remove active class from previous filter and add to current
          isotopeItem.querySelector('.isotope-filters .filter-active')?.classList.remove('filter-active');
          this.classList.add('filter-active');
          // Apply the new filter
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          // Re‑trigger AOS if available
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /* ==================================================
   * FAQ Toggle – expand/collapse FAQ items when clicking question or arrow
   * FIX: removed duplicate line, added existence check
   * ================================================== */
  document.querySelectorAll('.faq-item h3, .faq-toggle').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();                // Prevent any default link behaviour
      const item = event.target.closest('.faq-item');
      if (item) {
        item.classList.toggle('faq-active'); // CSS handles the visual transition
      }
    });
  });

  /* ==================================================
   * Swiper Slider initialisation – for testimonials carousel etc.
   * ================================================== */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll('.swiper').forEach(function(swiperElement) {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (!configElement) {
        // Fallback: use default config if none provided
        new Swiper(swiperElement, {
          loop: true,
          speed: 600,
          autoplay: { delay: 5000 },
          slidesPerView: 'auto',
          pagination: { el: '.swiper-pagination', clickable: true }
        });
        return;
      }
      try {
        let config = JSON.parse(configElement.innerHTML.trim());
        new Swiper(swiperElement, config);
      } catch (e) {
        console.error('Invalid Swiper config', e);
      }
    });
  }
  window.addEventListener('load', initSwiper);

  /* ==================================================
   * AOS (Animate On Scroll) initialisation
   * ================================================== */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

});