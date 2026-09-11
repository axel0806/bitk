const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  formMsg.textContent = 'Skickar...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMsg.textContent = 'Tack! Vi hör av oss inom kort.';
      form.reset();
    } else {
      formMsg.textContent = 'Något gick fel. Prova igen om en stund.';
    }
  } catch (error) {
    formMsg.textContent = 'Något gick fel. Kontrollera din internetanslutning och prova igen.';
  } finally {
    submitBtn.disabled = false;
  }
});