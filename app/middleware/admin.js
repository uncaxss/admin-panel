export default defineNuxtRouteMiddleware(async (to) => {
  // Только на клиенте
  if (import.meta.client) {
    const username = localStorage.getItem('auth')

    try {
      const response = await $fetch('/api/userData', {
        headers: {
          Authorization: `Bearer ${username}`
        }
      })

      if (response.role !== 'admin') {
        // 🔴 Не админ — запрещено
        return navigateTo('/admin')
      }
    } catch (err) {
      return navigateTo('/')
    }
  }
})