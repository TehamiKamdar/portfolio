$(document).ready(function () {

  /* -------------------- Particles.js -------------------- */
  if ($('#particles-js').length) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#c29b00" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#c29b00",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          random: true,
          out_mode: "out",
          bounce: false
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" },
          onclick: { enable: true, mode: "push" },
          resize: true
        }
      },
      retina_detect: true
    });
  }

  // Initialize Particle.js for loader
  function initParticles() {
      if (document.getElementById('particles-js-loader')) {
          particlesJS('particles-js-loader', {
              particles: {
                  number: {
                      value: 40,
                      density: {
                          enable: true,
                          value_area: 800
                      }
                  },
                  color: {
                      value: "#c29b00"
                  },
                  shape: {
                      type: "circle",
                      stroke: {
                          width: 0,
                          color: "#000000"
                      }
                  },
                  opacity: {
                      value: 0.5,
                      random: true,
                      anim: {
                          enable: true,
                          speed: 1,
                          opacity_min: 0.3,
                          sync: false
                      }
                  },
                  size: {
                      value: 3,
                      random: true,
                      anim: {
                          enable: true,
                          speed: 2,
                          size_min: 0.1,
                          sync: false
                      }
                  },
                  line_linked: {
                      enable: true,
                      distance: 150,
                      color: "#c29b00",
                      opacity: 0.2,
                      width: 1
                  },
                  move: {
                      enable: true,
                      speed: 1,
                      direction: "none",
                      random: true,
                      straight: false,
                      out_mode: "out",
                      bounce: false,
                      attract: {
                          enable: false,
                          rotateX: 600,
                          rotateY: 1200
                      }
                  }
              },
              interactivity: {
                  detect_on: "canvas",
                  events: {
                      onhover: {
                          enable: true,
                          mode: "grab"
                      },
                      onclick: {
                          enable: true,
                          mode: "push"
                      },
                      resize: true
                  },
                  modes: {
                      grab: {
                          distance: 200,
                          line_linked: {
                              opacity: 0.3
                          }
                      },
                      push: {
                          particles_nb: 4
                      }
                  }
              },
              retina_detect: true
          });
      }
  }
  initParticles()

  /* -------------------- Owl Carousel -------------------- */
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
      1200: { items: 4 }
    },
    navText: [
      '<i class="ri-arrow-left-s-line"></i>',
      '<i class="ri-arrow-right-s-line"></i>'
    ]
  });

  /* -------------------- Navbar Scroll Background -------------------- */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  /* -------------------- Scroll Spy (Active Nav) -------------------- */
  const $sections = $('section');
  const $navLinks = $('.nav-link');

  $(window).on('scroll', function () {
    const scrollPos = $(window).scrollTop() + ($(window).height() * 0.3);

    $sections.each(function () {
      const $section = $(this);
      if (
        $section.offset().top <= scrollPos &&
        ($section.offset().top + $section.outerHeight()) > scrollPos
      ) {
        const id = $section.attr('id');
        $navLinks.removeClass('active');
        $('.nav-link[href="#' + id + '"]').addClass('active');
      }
    });
  });

  /* -------------------- Smooth Scrolling + Instant Active -------------------- */
  $('a[href^="#"]').on('click', function (e) {
    const targetId = $(this).attr('href');
    if (targetId === '#') return;

    const $target = $(targetId);
    if ($target.length) {
      e.preventDefault();

      // Instantly set active nav link
      $('.nav-link').removeClass('active');
      $(this).addClass('active');

      // Smooth scroll to section
      $('html, body').animate({
        scrollTop: $target.offset().top - 80
      }, 600);
    }
  });

  /* -------------------- Portfolio Filtering -------------------- */
  $('.filter-btn').on('click', function () {
    const filterValue = $(this).attr('data-filter');

    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    $('.portfolio-item').each(function () {
      const categories = $(this).parent().attr('data-category')?.split(', ') || [];
      const visible = (filterValue === 'all' || categories.includes(filterValue));

      if (visible) {
        $(this).parent().fadeIn(400);
        $(this).addClass('animate-in');
      } else {
        $(this).parent().fadeOut(400);
        $(this).removeClass('animate-in');
      }
    });
  });

  /* -------------------- Skills Category Filtering -------------------- */
  $('.category-btn').on('click', function () {
    const category = $(this).attr('data-category');

    $('.category-btn').removeClass('active');
    $(this).addClass('active');

    $('.skill-item').each(function () {
      const itemCategory = $(this).attr('data-category');
      if (category === 'all' || itemCategory === category) {
        $(this).fadeIn(400);
      } else {
        $(this).fadeOut(400);
      }
    });

    // Refresh Owl Carousel after filter
    $('.owl-carousel').trigger('refresh.owl.carousel');
  });

  /* -------------------- Skill Progress Animation -------------------- */
  function animateSkills() {
    const winTop = $(window).scrollTop();
    const winHeight = $(window).height();

    $('.skill-progress').each(function () {
      const pos = $(this).offset().top;
      const width = $(this).data('width');

      if (pos < winTop + winHeight - 100 && !$(this).hasClass('filled')) {
        $(this).addClass('filled').css('width', width);
      }
    });
  }

  animateSkills();
  $(window).on('scroll', animateSkills);

  /* -------------------- Scroll Animations -------------------- */
  function animateElements() {
    const winTop = $(window).scrollTop();
    const winHeight = $(window).height();

    $('.section-title, .about-image, .skill-bar, .portfolio-item, .contact-info, .contact-form').each(function () {
      const pos = $(this).offset().top;
      if (pos < winTop + winHeight - 100) {
        $(this).addClass('animate');
      }
    });
  }

  animateElements();
  $(window).on('scroll', animateElements);

});
