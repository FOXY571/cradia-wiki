<template>
  <div :class="type">
    <div>
      <span class="label">{{ label }}</span>
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'note',
  },
})
</script>

<style scoped>
.note,
.warning {
  color: black;

  display: flex;
  align-items: center;
  justify-self: center;

  width: 90%;
  padding: 0.4em 0.8em;
  margin-bottom: 1em;
}

.note {
  background-color: rgb(143, 175, 236);
  border-left: 4px solid cornflowerblue;
}

.warning {
  background-color: rgb(175, 0, 0);
  border-left: 4px solid darkred;
}

span {
  display: block;
}

.label {
  font-weight: bold;
}

.warning::before {
  content: '';

  background-image: url('../../assets/images/warning-icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50%;

  width: 2.5em;
  height: 2.5em;
  margin-right: 1em;
}
</style>
