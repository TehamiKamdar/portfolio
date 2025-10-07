document.addEventListener('DOMContentLoaded', function () {
  /* -------------------- Particles.js -------------------- */
  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
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

  /* -------------------- Scroll Spy (Active Nav) -------------------- */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href").substring(1) === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));

  /* -------------------- Navbar Scroll Background -------------------- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* -------------------- Portfolio Filter -------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        const categories = item.parentElement.getAttribute('data-category')?.split(', ') || [];
        const visible = (filterValue === 'all' || categories.includes(filterValue));
        item.parentElement.style.display = visible ? 'block' : 'none';
        item.classList.toggle('animate-in', visible);
      });
    });
  });

  /* -------------------- Scroll Animations -------------------- */
  const scrollElements = document.querySelectorAll(
    '.section-title, .about-image, .skill-bar, .portfolio-item, .contact-info, .contact-form'
  );

  const handleScrollAnimations = () => {
    const screenPosition = window.innerHeight / 1.2;
    scrollElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      if (elementPosition < screenPosition) {
        element.classList.add('animate');

        // Animate skill bars
        if (element.classList.contains('skill-bar')) {
          const progressBar = element.querySelector('.skill-progress');
          if (progressBar && !progressBar.style.width) {
            progressBar.style.width = progressBar.getAttribute('data-width');
          }
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimations);
  handleScrollAnimations(); // Initial run on page load

  /* -------------------- Smooth Scrolling -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  /* -------------------- Smooth Scrolling + Instant Active -------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // 🔥 Instantly highlight the clicked nav link
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        // Smooth scroll to section
        window.scrollTo({
          top: targetElement.offsetTop - 80, // adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
});
