<template>
  <div class="info-box primary-border">
    <div class="label">{{ label }}</div>
    <slot />
    <div v-for="(category, categoryName) in content" :key="categoryName">
      <div class="header" v-if="categoryName">{{ categoryName }}</div>
      <table cellpadding="4">
        <tbody>
          <tr v-for="(item, itemIndex) in category" :key="itemIndex">
            <th>
              <a
                v-if="item.keyLink"
                :title="formatEntryName(item.keyLink)"
                :href="`/${item.keyLink}`"
              >
                {{ item.key }}
              </a>
              <span v-else>{{ item.key }}</span>
            </th>
            <td>
              <div v-if="Array.isArray(item.value)">
                <div v-for="(value, valueIndex) in item.value" :key="valueIndex">
                  <a
                    v-if="item.valueLink && item.valueLink[value]"
                    :title="formatEntryName(item.valueLink[value])"
                    :href="`/${item.valueLink[value]}`"
                  >
                    {{ value }}
                  </a>
                  <span v-else>{{ value }}</span>
                </div>
              </div>
              <SoundCloud v-else-if="item.sc" :songId="item.value" />
              <a
                v-else-if="item.valueLink"
                :title="formatEntryName(item.valueLink)"
                :href="`/${item.valueLink}`"
              >
                {{ item.value }}
              </a>
              <span v-else>{{ item.value }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { formatEntryName } from '../../utils/formatting'

import SoundCloud from './SoundCloud.vue'

defineProps({
  label: {
    type: String,
    default: 'Info',
  },
  content: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.info-box {
  background-color: rgba(0, 0, 0, 0.1);

  float: right;
  clear: right;

  width: 300px;
  margin: 0 0 15px 25px;
  padding: 3px;
}

.label {
  color: var(--secondary-color);
  background-color: rgba(0, 0, 0, 0.1);

  font-size: 20px;
  text-align: center;
  line-height: 24px;
  white-space: nowrap;

  padding: 5px;
  margin-bottom: 2.5px;
}

.header {
  background-color: rgba(0, 0, 0, 0.15);

  font-size: 15px;
  font-weight: bold;
  text-align: center;
  line-height: 24px;
  white-space: nowrap;

  padding: 5px;
  margin-bottom: 2.5px;
}

table {
  font-size: 12.5px;
  line-height: 24px;
}

th {
  text-align: left;
}

@media (max-width: 1280px) {
  .info-box {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .info-box {
    width: 200px;
  }
}

@media screen and (max-width: 576px) {
  .info-box {
    float: unset;

    width: 250px;
    margin-left: 0px;
  }
}
</style>
