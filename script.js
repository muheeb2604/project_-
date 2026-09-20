const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const authModal = document.getElementById('authModal');
const closeAuth = document.getElementById('closeAuth');
const loginButtons = document.querySelectorAll('.btn-ghost, .btn-primary');

const applyTheme = (isDark) => {
  if (!body) return;
  body.classList.toggle('light-theme', !isDark);

  try {
    localStorage.setItem('novaTheme', isDark ? 'dark' : 'light');
  } catch (error) {
    console.warn('Theme preference could not be saved:', error);
  }
};

try {
  const savedTheme = localStorage.getItem('novaTheme');
  if (savedTheme === 'light') {
    applyTheme(false);
  } else {
    applyTheme(true);
  }
} catch (error) {
  console.warn('Theme could not be restored from localStorage:', error);
  applyTheme(true);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = !body.classList.contains('light-theme');
    applyTheme(isDark);
  });
}

const openAuthModal = () => {
  if (!authModal) return;
  authModal.classList.add('visible');
  authModal.setAttribute('aria-hidden', 'false');
};

const closeAuthModal = () => {
  if (!authModal) return;
  authModal.classList.remove('visible');
  authModal.setAttribute('aria-hidden', 'true');
};

loginButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const isPrimaryCta = button.classList.contains('btn-primary');
    if (isPrimaryCta || button.classList.contains('btn-ghost')) {
      openAuthModal();
    }
  });
});

if (closeAuth) {
  closeAuth.addEventListener('click', closeAuthModal);
}

if (authModal) {
  authModal.addEventListener('click', (event) => {
    if (event.target === authModal) {
      closeAuthModal();
    }
  });
}
