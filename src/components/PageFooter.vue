<template>
  <footer>
    <span>
      Website created by
      <a class="footer-link" href="https://github.com/FOXY571" target="_blank">Thomas Towson</a>
    </span>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  background-color: var(--background-color);

  display: flex;
  justify-content: center;
  align-items: center;

  height: 35px;
}

.footer-link {
  color: var(--primary-color);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
