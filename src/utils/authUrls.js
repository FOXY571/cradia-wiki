import { computed } from 'vue'
import { useRoute } from 'vue-router'
import config from '../config'

/**
 * Composable for generating authentication-related URLs with return paths.
 *
 * @returns {Object} An object containing the createAccountUrl and loginUrl.
 */
export function useAuthUrls() {
  const route = useRoute()

  const returnTo = computed(() => {
    const path = route.query.returnto || route.fullPath.replace(/^\/wiki\//, '')
    return path && path !== '/' ? path : config.mainPage
  })

  const createAccountUrl = computed(
    () => `/wiki/CreateAccount?returnto=${encodeURIComponent(returnTo.value)}`,
  )
  const loginUrl = computed(() => `/wiki/UserLogin?returnto=${encodeURIComponent(returnTo.value)}`)

  return { createAccountUrl, loginUrl }
}
