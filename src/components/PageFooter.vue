<template>
  <div class="footer">
    <span class="footer-text">
      Website created by
      <a class="footer-link" href="https://github.com/FOXY571" target="_blank">Thomas Towson</a>
    </span>
  </div>
</template>

<script setup></script>

<style scoped>
.footer {
  background-color: var(--background-color);

  display: flex;
  justify-content: center;
}

.footer-text {
  margin: 0.75em 0;
}

.footer-link {
  color: var(--primary-color);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
