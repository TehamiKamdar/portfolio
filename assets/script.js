$(function () {

  /* ===== Particles.js (Main + Loader) ===== */
  const initParticles = id => {
    if (!document.getElementById(id)) return;
    particlesJS(id, {
      particles: {
        number: { value: id === 'particles-js' ? 80 : 40, density: { enable: true, value_area: 800 } },
        color: { value: "#c29b00" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true, anim: { enable: id !== 'particles-js', speed: 2, size_min: 0.1 } },
        line_linked: { enable: true, distance: 150, color: "#c29b00", opacity: 0.2, width: 1 },
        move: { enable: true, speed: id === 'particles-js' ? 2 : 1, random: true, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: id === 'particles-js' ? "repulse" : "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: { grab: { distance: 200, line_linked: { opacity: 0.3 } }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  };
  initParticles('particles-js');
  initParticles('particles-js-loader');

  /* ===== Owl Carousel ===== */
  $(".owl-carousel").owlCarousel({
    loop: true, margin: 20, nav: true, dots: false, autoplay: true, autoplayTimeout: 2000,
    responsive: { 0: { items: 1 }, 768: { items: 2 }, 992: { items: 3 }, 1200: { items: 4 } },
    navText: ['<i class="ri-arrow-left-s-line"></i>', '<i class="ri-arrow-right-s-line"></i>']
  });

  /* ===== Navbar scroll bg ===== */
  $(window).on('scroll', () =>
    $('.navbar').toggleClass('scrolled', $(window).scrollTop() > 50)
  );

  /* ===== Active link on scroll ===== */
  const $links = $('.nav-link');
  $(window).on('scroll', () => {
    const pos = $(window).scrollTop() + $(window).height() * 0.3;
    $('section').each(function () {
      const id = $(this).attr('id');
      if ($(this).offset().top <= pos && $(this).offset().top + $(this).outerHeight() > pos)
        $links.removeClass('active').filter(`[href="#${id}"]`).addClass('active');
    });
  });

  /* ===== Smooth scroll ===== */
  $('a[href^="#"]').on('click', function (e) {
    const id = $(this).attr('href');
    if (id.length > 1) {
      e.preventDefault();
      $('html,body').animate({ scrollTop: $(id).offset().top - 80 }, 600);
      $links.removeClass('active');
      $(this).addClass('active');
    }
  });

  /* ===== Portfolio Filter ===== */
  $('.filter-btn').on('click', function () {
    const val = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    $('.portfolio-item').each(function () {
      const show = val === 'all' || ($(this).parent().data('category') || "").split(', ').includes(val);
      $(this).parent().fadeToggle(400, show).toggleClass('animate-in', show);
    });
  });

  /* ===== Skill Category Filter ===== */
  $('.category-btn').on('click', function () {
    const cat = $(this).data('category');
    $('.category-btn').removeClass('active');
    $(this).addClass('active');
    $('.skill-item').each(function () {
      $(this).fadeToggle(400, cat === 'all' || $(this).data('category') === cat);
    });
    $('.owl-carousel').trigger('refresh.owl.carousel');
  });

  /* ===== Animate skills + elements ===== */
  const animate = (cls, cb) => $(window).on('scroll', cb).trigger('scroll');
  animate('.skill-progress', () => $('.skill-progress').each(function () {
    if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100 && !$(this).hasClass('filled'))
      $(this).addClass('filled').css('width', $(this).data('width'));
  }));
  animate('.animate', () => $('.section-title, .about-image, .skill-bar, .portfolio-item, .contact-info, .contact-form')
    .each(function () { if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 100) $(this).addClass('animate'); }));

});

/* ===== GitHub Portfolio ===== */
const username = "TehamiKamdar";
const token = "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"
const container = document.getElementById("projects");

const humanize = s => s.replace(/[_-]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
const topLangs = langs => Object.keys(langs).sort((a, b) => langs[b] - langs[a]);

async function fetchRepos() {
  let all = [], page = 1, perPage = 100;
  while (true) {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
    const data = await res.json();
    if (!data.length) break;
    all = all.concat(data);
    page++;
  }

  const repos = [];
  for (const r of all) {
    const t = await (await fetch(r.url + "/topics", { headers: { Accept: "application/vnd.github.mercy-preview+json","Authorization": `token ${token}` } })).json();
    if (t.names?.includes("portfolio")) {
      const langs = await (await fetch(r.languages_url)).json();
      repos.push({ ...r, topics: t.names, languages: langs });
    }
  }

  const featured = repos.filter(r => r.topics.includes("featured"));
  const normal = repos.filter(r => !r.topics.includes("featured"));
  const ordered = [featured[0], ...normal.slice(0, 5), featured[1], ...normal.slice(5)].filter(Boolean);

  container.innerHTML = "";
  ordered.forEach(r => {
    const langs = topLangs(r.languages).map(l => `<span class="tech-tag">${l}</span>`).join("") || "<span class='tech-tag'>N/A</span>";
    container.innerHTML += `
      <div class="project-card ${r.topics.includes("featured") ? "featured" : ""}">
        <div class="project-image">
          <div class="project-badge">${r.topics[0] || "Project"}</div>
          <div class="project-overlay"></div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${humanize(r.name)}</h3>
          <p class="project-description">${r.description || "No description provided."}</p>
          <div class="project-tech">${langs}</div>
          <div class="project-links">
            ${r.homepage ? `<a href="${r.homepage}" target="_blank" class="project-link primary"><i class="ri-external-link-line"></i> Live Demo</a>` : ""}
            <a href="${r.html_url}" target="_blank" class="project-link secondary"><i class="ri-github-fill"></i> Source Code</a>
          </div>
        </div>
      </div>`;
  });
}
fetchRepos();