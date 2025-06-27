const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const previewCard = document.getElementById('previewCard');
const templateItems = document.querySelectorAll('.carousel-item');

let lightBgImage = null;
let darkBgImage = null;

// Theme toggle
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  themeIcon.textContent = isDarkMode ? '☀️' : '🌙';

  // Update background image based on theme
  if (isDarkMode && darkBgImage) {
    previewCard.style.backgroundImage = `url('${darkBgImage}')`;
  } else if (!isDarkMode && lightBgImage) {
    previewCard.style.backgroundImage = `url('${lightBgImage}')`;
  } else {
    previewCard.style.backgroundImage = '';
  }
});

// Handle template selection
templateItems.forEach(item => {
  item.addEventListener('click', () => {
    templateItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    previewCard.className = 'card ' + item.getAttribute('data-template');

    // Retain background image when template changes
    const isDarkMode = body.classList.contains('dark-mode');
    previewCard.style.backgroundImage = `url('${isDarkMode ? darkBgImage : lightBgImage}')`;
  });
});

// Live text preview
document.getElementById('nameInput').addEventListener('input', e => {
  document.getElementById('previewName').textContent = e.target.value || 'Your Name';
});
document.getElementById('roleInput').addEventListener('input', e => {
  document.getElementById('previewRole').textContent = e.target.value || 'Your Role';
});
document.getElementById('contactInput').addEventListener('input', e => {
  document.getElementById('previewContact').textContent = e.target.value || 'Your Contact Info';
});

// Upload profile photo
document.getElementById('photoUpload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('previewPhoto').innerHTML = `<img src="${reader.result}" alt="Profile Photo">`;
  };
  reader.readAsDataURL(file);
});

// Upload background image
document.getElementById('bgImage').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const isDarkMode = body.classList.contains('dark-mode');
    if (isDarkMode) {
      darkBgImage = reader.result;
    } else {
      lightBgImage = reader.result;
    }
    previewCard.style.backgroundImage = `url('${reader.result}')`;
  };
  reader.readAsDataURL(file);
});

// Download card as image
document.getElementById('downloadBtn').addEventListener('click', () => {
  html2canvas(previewCard).then(canvas => {
    const link = document.createElement('a');
    link.download = 'business-card.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
