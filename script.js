const projects = [
  {
    id: 1,
    title: 'Page de connexion premium',
    category: 'Frontend',
    tech: ['HTML', 'CSS', 'UX/UI'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Interface de connexion conçue pour offrir un sentiment de confiance, de simplicité et de modernité dès la première interaction.',
    details: [
      'Refonte de l’expérience d’authentification pour la rendre plus fluide et plus rassurante.',
      'Hiérarchie visuelle revue pour mieux guider l’utilisateur sur les actions prioritaires.',
      'Approche mobile-first pour garder une excellente lisibilité sur smartphone.'
    ],
    link: '#contact'
  },
  {
    id: 2,
    title: 'Portfolio professionnel',
    category: 'UI/UX',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Portfolio personnel orienté recruteur, pensé pour valoriser les compétences, la personnalité et les réalisations du développeur.',
    details: [
      'Mise en scène du profil avec une structure claire et des sections narratives cohérentes.',
      'Design premium inspiré des interfaces de produits technologiques haut de gamme.',
      'Navigation fluide avec animations légères et interactions bien pensées.'
    ],
    link: '#contact'
  },
  {
    id: 3,
    title: 'Site vitrine restaurant',
    category: 'Frontend',
    tech: ['HTML', 'CSS'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80',
    summary: 'Site vitrine destiné à présenter menus, services et identité visuelle d’un restaurant sur des écrans variés.',
    details: [
      'Mise en avant des offres et de l’identité visuelle du concept culinaire.',
      'Structure claire pour faciliter la consultation sur mobile et desktop.',
      'Palette élégante et esthétique cohérente avec le positionnement du restaurant.'
    ],
    link: '#contact'
  },
  {
    id: 4,
    title: 'Bibliothèque hors ligne',
    category: 'PHP',
    tech: ['PHP', 'HTML', 'CSS'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    summary: 'Plateforme permettant un accès simple à des ressources documentaires sans dépendre de la connexion internet.',
    details: [
      'Conception d’une interface de consultation rapide et lisible.',
      'Organisation logique des contenus pour améliorer la navigation.',
      'Approche centrée sur la simplicité d’usage et la disponibilité des documents.'
    ],
    link: '#contact'
  },
  {
    id: 5,
    title: 'Salon de coiffure réservation',
    category: 'Full-stack',
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    year: '2025',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Solution de réservation pensée pour faciliter la prise de rendez-vous directement depuis mobile ou ordinateur.',
    details: [
      'Simplification du parcours de réservation pour réduire les frictions utilisateur.',
      'Interface claire et fonctionnelle adaptée à un usage quotidien.',
      'Mise en place d’un parcours de prise de rendez-vous plus direct et plus pratique.'
    ],
    link: '#contact'
  }
];

const projectGrid = document.getElementById('projectGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalSummary = document.getElementById('modalSummary');
const modalHighlights = document.getElementById('modalHighlights');
const modalMeta = document.getElementById('modalMeta');
const themeToggle = document.querySelector('[data-theme-toggle]');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('mainNav');
const year = document.getElementById('year');
const contactForm = document.getElementById('contactForm');

function renderProjects(category = 'Tous') {
  const filteredProjects = category === 'Tous'
    ? projects
    : projects.filter((project) => project.category === category || project.tech.includes(category));

  projectGrid.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card reveal">
          <img src="${project.image}" alt="${project.title}" />
          <div class="project-card__body">
            <div class="project-topline">
              <span class="project-tag">${project.category}</span>
              <span class="project-year">${project.year}</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
            <div class="project-meta">
              <span>${project.tech.join(' • ')}</span>
              <button type="button" data-project-id="${project.id}">Voir le cas</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('[data-project-id]').forEach((button) => {
    button.addEventListener('click', () => openProjectModal(Number(button.dataset.projectId)));
  });

  observeRevealItems();
}

function observeRevealItems() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function openProjectModal(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;

  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalTitle.textContent = project.title;
  modalSummary.textContent = project.summary;
  modalHighlights.innerHTML = project.details.map((item) => `<li>${item}</li>`).join('');
  modalMeta.innerHTML = project.tech.map((item) => `<span>${item}</span>`).join('');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    renderProjects(button.dataset.filter);
  });
});

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

document.querySelector('.modal-close').addEventListener('click', closeProjectModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-open')) {
    closeProjectModal();
  }
});

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (year) year.textContent = new Date().getFullYear();

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.toString().trim() || 'Client';
    const email = formData.get('email')?.toString().trim() || '';
    const subject = formData.get('subject')?.toString().trim() || 'Demande de contact';
    const message = formData.get('message')?.toString().trim() || '';

    const mailtoLink = `mailto:sylvainsaint2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
    contactForm.reset();
  });
}

renderProjects();
