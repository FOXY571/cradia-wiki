<template>
  <figure class="primary-border">
    <slot />
    <figcaption>
      <slot name="caption" />
    </figcaption>
  </figure>
</template>

<script setup></script>

<style lang="scss" scoped>
figure {
  background-color: rgba(0, 0, 0, 0.1);

  float: right;
  clear: right;

  width: 250px;
  margin: 0 0 15px 25px;
  padding: 3px;
}

figcaption {
  font-size: 12.5px;
  line-height: 24px;
}

@media (max-width: 1280px) {
  figure {
    width: 200px;
  }
}

@media (max-width: 768px) {
  figure {
    width: 150px;
  }
}

@media screen and (max-width: 576px) {
  figure {
    float: unset;

    width: 250px;
    margin-left: 0px;
  }
}
</style>
