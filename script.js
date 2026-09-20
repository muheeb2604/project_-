const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const loginButtons = document.querySelectorAll('.btn-ghost, .btn-primary');

const applyTheme = (isDark) => {
  body.classList.toggle('light-theme', !isDark);
  localStorage.setItem('novaTheme', isDark ? 'dark' : 'light');
};

const savedTheme = localStorage.getItem('novaTheme');
if (savedTheme === 'light') {
  applyTheme(false);
} else {
  applyTheme(true);
}

themeToggle.addEventListener('click', () => {
  const isDark = !body.classList.contains('light-theme');
  applyTheme(isDark);
});

loginButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isPrimaryCta = button.classList.contains('btn-primary');
    if (isPrimaryCta || button.classList.contains('btn-ghost')) {
      authModal.classList.add('visible');
      authModal.setAttribute('aria-hidden', 'false');
    }
  });
});

closeAuth.addEventListener('click', () => {
  authModal.classList.remove('visible');
  authModal.setAttribute('aria-hidden', 'true');
});

authModal.addEventListener('click', (event) => {
  if (event.target === authModal) {
    authModal.classList.remove('visible');
    authModal.setAttribute('aria-hidden', 'true');
  }
});
