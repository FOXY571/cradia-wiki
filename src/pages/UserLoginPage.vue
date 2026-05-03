<template>
  <h1>Log in</h1>

  <!-- Add warning for when a user is already logged in -->

  <div class="login-form">
    <form @submit.prevent="submit">
      <Transition name="fade">
        <div class="warning-text" v-if="loginError">{{ loginError }}</div>
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
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          v-model="password"
        />
      </div>

      <button class="form-button" type="submit">Log In</button>

      <div>
        Don't have an account? <a :href="createAccountUrl">Join {{ config.wikiName }} Wiki.</a>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import config from '../config'
import { logInUser } from '../utils/UserHandler'
import { useAuthUrls } from '../utils/authUrls'
import { setTitle } from '../utils/titleHandler'

const { returnTo, createAccountUrl } = useAuthUrls()

const username = ref('')
const password = ref('')

// Post-submit states
const loginError = ref(null)

async function submit() {
  loginError.value = null

  try {
    await logInUser(username.value, password.value)
    document.location.href = `/wiki/${returnTo.value}`
  } catch (error) {
    loginError.value = error.message
  }
}

setTitle('Log in')
</script>

<style scoped>
.login-form form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  max-width: 400px;
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

.warning-text {
  font-size: 0.875rem;
}

.warning-text {
  background-color: darkred;
  border: #550000 1px solid;
  border-radius: 1px;
  font-style: italic;

  padding: 3px;
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
