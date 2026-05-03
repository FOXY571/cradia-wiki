<template>
  <h1>Create a {{ config.wikiName }} Wiki account</h1>

  <NoteBlock
    label="Creating an account currently does not have any use."
    text="Editing pages locally is slowly being implemeneted. Until then, feel free to test this new feature."
  />

  <NoteBlock :label="`You are already logged in as ${userData.username}.`" type="warning" />

  <div class="create-account-form">
    <a :href="returnTo" v-if="userData">
      <button class="form-button">Continue as {{ userData.username }}</button>
    </a>

    <h2 v-if="currentUser">Create another account</h2>

    <form @submit.prevent="submit">
      <Transition name="fade">
        <div class="error-text" v-if="createAccountError">{{ createAccountError }}</div>
      </Transition>

      <div class="field">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          required
          v-model="username"
        />
        <Transition name="fade">
          <div class="error-text" v-if="invalidUsername">
            You have not specified a valid username.
          </div>
          <div class="error-text" v-else-if="noCharsUsername">
            Your username must contain at least one letter or number.
          </div>
          <div class="warning-text" v-else-if="username !== trueUsername">
            Your username will be adjusted to "{{ trueUsername }}" due to technical restrictions.
          </div>
        </Transition>
      </div>

      <div class="field">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
          v-model="email"
        />
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter a password"
          required
          v-model="password"
        />
        <Transition name="fade">
          <div class="error-text" v-if="badPassword">
            Passwords must be at least 8 characters long.
          </div>
        </Transition>
        <div class="help-text">
          It is recommended to use a unique password that you are not using on any other website.
        </div>
      </div>

      <div class="field">
        <label for="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Enter password again"
          required
          v-model="confirmPassword"
        />
        <Transition name="fade">
          <div class="error-text" v-if="!passwordsMatch">Passwords do not match.</div>
        </Transition>
      </div>

      <button class="form-button" type="submit" :disabled="!canSubmit">Create Account</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import config from '../config'
import { currentUser, getUserData, createUserAccount } from '../firebase/authHandler'
import { setTitle } from '../utils/titleHandler'

import NoteBlock from '../components/entry-components/NoteBlock.vue'

const route = useRoute()
const returnTo = route.query.returnto ? `/wiki/${route.query.returnto}` : '/'

const userData = ref(null)
watch(
  currentUser,
  async (newUser) => {
    if (newUser) {
      userData.value = await getUserData(newUser.uid)
    }
  },
  { immediate: true },
)

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const trueUsername = computed(() => {
  const trimmed = username.value.replaceAll('_', ' ').replace(/\s+/g, ' ').trim()
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
})

// Pre-submit conditions
const invalidUsername = computed(() => username.value && !/^[A-Za-z0-9 _-]+$/.test(username.value))
const noCharsUsername = computed(() => username.value && !/(?=.*[A-Za-z0-9])/.test(username.value))
const badUsername = computed(
  () => username.value && (invalidUsername.value || noCharsUsername.value),
)
const badPassword = computed(() => password.value && password.value.length < 8)
const passwordsMatch = computed(
  () => !confirmPassword.value || password.value === confirmPassword.value,
)
const canSubmit = computed(() => !badUsername.value && !badPassword.value && passwordsMatch.value)

// Post-submit states
const createAccountError = ref(null)

async function submit() {
  createAccountError.value = null

  try {
    await createUserAccount(trueUsername.value, email.value, password.value)
    document.location.href = returnTo
  } catch (error) {
    createAccountError.value = error.message
  }
}

setTitle(`Create a ${config.wikiName} Wiki account`)
</script>

<style scoped>
.create-account-form {
  max-width: 400px;
}

.create-account-form form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.field label {
  font-weight: bold;
}

.field input {
  color: var(--primary-color);
  background-color: rgba(0, 0, 0, 0.25);

  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1) rgba(13, 4, 2, 0.2) rgba(13, 4, 2, 0.2)
    rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  outline: transparent 2px solid;

  padding: 0.5rem;

  transition: all 0.2s;
}

.field input:hover {
  border-color: gray;
}

.field input:focus-visible {
  border-color: rgba(255, 255, 255, 0.1) rgba(13, 4, 2, 0.2) rgba(13, 4, 2, 0.2)
    rgba(255, 255, 255, 0.1);

  outline-color: var(--link-color);
}

.field input::placeholder {
  color: gray;
}

.field ::-ms-reveal {
  filter: invert(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.error-text,
.warning-text,
.help-text {
  font-size: 0.875rem;
}

.error-text {
  background-color: darkred;
  border: #550000 1px solid;
  border-radius: 1px;
  font-style: italic;

  padding: 3px;
}

.warning-text {
  background-color: darkgoldenrod;
  border: #554400 1px solid;
  border-radius: 1px;
  font-style: italic;

  padding: 3px;
}

.help-text {
  color: darkgray;
}

.form-button {
  color: var(--primary-color);
  background-color: rgba(0, 0, 0, 0.25);

  border-width: 1px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.1) rgba(13, 4, 2, 0.2) rgba(13, 4, 2, 0.2)
    rgba(255, 255, 255, 0.1);
  border-radius: 6px;

  font-weight: bold;
  outline: transparent 2px solid;
  cursor: pointer;

  width: 100%;
  padding: 0.5rem;

  transition: all 0.2s;
}

.form-button:disabled {
  color: gray;
  cursor: not-allowed;
}

.form-button:hover:not(:disabled) {
  border-color: gray;
}

.form-button:focus-visible:not(:disabled),
.form-button:active:not(:disabled) {
  outline-color: var(--link-color);
}
</style>
