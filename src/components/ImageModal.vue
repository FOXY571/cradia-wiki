<template>
  <div id="imageModal" class="modal">
    <span id="closeButton" class="close-button">&times;</span>

    <img class="modal-content" :src="imageSource">
    <div class="caption" v-html="imageCaption"></div>
    <div class="counter" v-html="counter"></div>

    <a id="previousButton" class="previous-button">&#10094;</a>
    <a id="nextButton" class="next-button">&#10095;</a>

    <div id="thumbnailStrip" class="thumbnail-strip">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img.src"
        :alt="img.alt || ''"
        :class="{ active: index === currentIndex }"
        :data-index="index"
        @click="openModal(index)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const imageSource = ref('')
const imageCaption = ref('')
const counter = ref('')

let modalElement = null

let images = []
let currentIndex = 0

const updateModal = () => {
  const img = images[currentIndex]
  imageSource.value = img.src
  imageCaption.value = img.alt || ''
  counter.value = `Image ${currentIndex + 1} of ${images.length}`
}

const openModal = (index) => {
  currentIndex = index
  modalElement.style.display = 'block'
  updateModal()
}

const closeModal = () => {
  modalElement.style.display = 'none'
}

const showNext = () => {
  currentIndex = (currentIndex + 1) % images.length
  updateModal()
}

const showPrevious = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length
  updateModal()
}

onMounted(() => {
  modalElement = document.getElementById('imageModal')

  const attachListeners = () => {
    images = Array.from(document.querySelectorAll('img'))
      .filter(img => !img.closest('#imageModal'))

    images.forEach((img, idx) => {
      if (!img.dataset.modalListener) {
        img.addEventListener('click', () => openModal(idx))
        img.dataset.modalListener = 'true'
      }
    })
  }

  // Watch for DOM changes (e.g., route changes, dynamic content)
  const observer = new MutationObserver(() => {
    attachListeners()
  })

  observer.observe(document.body, { childList: true, subtree: true })

  document.getElementById('closeButton').onclick = closeModal
  document.getElementById('nextButton').onclick = showNext
  document.getElementById('previousButton').onclick = showPrevious
})

// Keypress support
window.addEventListener('keydown', (e) => {
  if (modalElement.style.display == 'block') {
    if (e.key == 'ArrowLeft') showPrevious()
    if (e.key == 'ArrowRight') showNext()
    if (e.key == 'Escape') closeModal()
  }
})
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.9);

  display: none;
  position: fixed;
  overflow: auto;

  left: 0;
  top: 0;

  width: 100%;
  height: 100%;
  padding-top: 60px;
}

.modal-content {
  display: block;

  max-width: 90%;
  max-height: calc(100vh - 225px);
  
  margin: auto;
}

.close-button {
  color: #f1f1f1;
  font-size: 40px;

  position: absolute;
  cursor: pointer;

  top: 20px;
  right: 35px;
}

.previous-button,
.next-button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 30px;
  user-select: none;
}

.previous-button {
  left: 0;
}

.next-button {
  right: 0; 
}

.caption {
  color: #ccc;
  font-size: 18px;
  text-align: center;

  padding: 10px;
}

.counter {
  color: #aaa;
  font-size: 14px;
  text-align: center;

  margin-top: -5px;
}

.thumbnail-strip {
  background-color: rgba(0, 0, 0, 0.8);

  display: flex;
  position: fixed;
  justify-content: center;
  box-sizing: border-box;
  gap: 8px;
  overflow-x: auto;

  bottom: 0;
  left: 0;
  right: 0;

  max-height: 80px;
  padding: 8px 10px;
}

.thumbnail-strip img {
  cursor: pointer;
  opacity: 0.6;

  width: auto;
  height: 60px;
}

.thumbnail-strip .active {
  opacity: 1;
  outline: 2px solid #fff;
  transform: scale(1.05);
}
</style>