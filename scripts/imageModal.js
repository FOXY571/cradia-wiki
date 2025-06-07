function modalInitialization() {
  const images = Array.from(document.getElementById('contentBody').querySelectorAll('img'));

  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');

  const captionText = document.getElementById('caption');
  const counter = document.getElementById('counter');

  const closeBtn = document.getElementById('closeButton');
  const prevBtn = document.getElementById('previousButton');
  const nextBtn = document.getElementById('nextButton');

  const thumbnailStrip = document.getElementById('thumbnailStrip');
  thumbnailStrip.innerHTML= '';

  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modal.style.display = 'block';
    updateModalImage();
  }

  function updateModalImage() {
    const img = images[currentIndex];
    modalImg.src = img.src;
    captionText.textContent = img.alt || '';
    counter.textContent = `Image ${currentIndex + 1} of ${images.length}`;
    updateThumbnailHighlight();
  }

  function updateThumbnailHighlight() {
    const thumbs = thumbnailStrip.querySelectorAll('img');
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('active', i == currentIndex);
    });
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
  });

  closeBtn.onclick = closeModal;

  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateModalImage();
  };

  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateModalImage();
  };

  // Keypress support
  window.addEventListener('keydown', (e) => {
    if (modal.style.display == 'block') {
      if (e.key == 'ArrowLeft') prevBtn.click();
      if (e.key == 'ArrowRight') nextBtn.click();
      if (e.key == 'Escape') closeModal();
    }
  });

  // Create thumbnails
  images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img.src;
    thumb.alt = img.alt;
    thumb.addEventListener('click', () => {
      openModal(index);
    });
    thumbnailStrip.appendChild(thumb);
  });
}

// Needs to initilaize after the entries content is loaded onto the page
document.addEventListener('onContentLoaded', () => {
  modalInitialization();
});