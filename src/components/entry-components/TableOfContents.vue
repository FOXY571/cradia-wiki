<template>
  <div class="toc primary-border">
    <div class="header">
      <input id="tocCheckbox" type="checkbox" role="button" @click="toggle" />
      <label for="tocCheckbox">
        <span class="label"><ContentsIcon /> Contents</span>
        <span class="arrow-icon" :class="{ open: isOpen }"><ArrowDownIcon /></span>
      </label>
    </div>

    <!-- Only goes three levels deep -->
    <!-- Will have to figure out a long-term solution if more levels are needed -->
    <ul v-if="isOpen">
      <li v-for="(category1, category1Index) in contents" :key="category1Index">
        <a :href="`#${category1.text}`">
          <span class="number">{{ `${category1Index + 1}` }}</span>
          <span class="text">{{ formatHeaderId(category1.text) }}</span>
        </a>
        <ul>
          <li v-for="(category2, category2Index) in category1.children" :key="category2Index">
            <a :href="`#${category2.text}`">
              <span class="number">{{ `${category1Index + 1}.${category2Index + 1}` }}</span>
              <span class="text">{{ formatHeaderId(category2.text) }}</span>
            </a>
            <ul>
              <li v-for="(category3, category3Index) in category2.children" :key="category3Index">
                <a :href="`#${category3.text}`">
                  <span class="number">
                    {{ `${category1Index + 1}.${category2Index + 1}.${category3Index + 1}` }}
                  </span>
                  <span class="text">{{ formatHeaderId(category3.text) }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { formatHeaderId } from '../../utils/formatting'

import ContentsIcon from '../icons/ContentsIcon.vue'
import ArrowDownIcon from '../icons/ArrowDownIcon.vue'

defineProps({
  contents: {
    type: Object,
    required: true,
  },
})

const isOpen = ref(true)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.toc {
  background-color: rgba(0, 0, 0, 0.1);

  width: 300px;
  padding: 3px;
}

.header {
  color: var(--secondary-color);
  background-color: rgba(0, 0, 0, 0.1);

  line-height: 24px;

  padding: 5px;
  margin-bottom: 2.5px;
}

input {
  display: none;
}

label {
  display: flex;
  cursor: pointer;
}

.label {
  flex: 1;
}

.arrow-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon.open {
  transform: rotate(180deg);
}

ul {
  list-style: none;

  padding: 0;
  margin: 0;
}

ul ul {
  margin-left: 1em;
}

li {
  margin: 0;
}

a {
  color: var(--link-color);
  font-size: 14px;
  text-decoration: none !important;

  display: block;

  padding: 7px;

  transition: background 0.3s;
  cursor: pointer;
}

a:hover {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.number {
  color: rgb(181, 189, 178);

  margin-right: 5px;
}

.number::after {
  content: '.';
}

.text {
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .toc {
    width: 250px;
  }
}
</style>
