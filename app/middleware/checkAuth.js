export default defineNuxtRouteMiddleware(async (to) => {
  // Только на клиенте
  if (import.meta.client) {
    const username = localStorage.getItem('auth')
    if (!username) {
      return navigateTo('/')
    }
  }
})