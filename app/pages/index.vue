<!-- app/pages/index.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-primary-dark px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-primary p-10 rounded-2xl shadow-xl">
      <!-- Логотип / Заголовок -->
      <div class="text-center">
        <div class="mx-auto h-12 w-12 bg-accent rounded-full flex items-center justify-center">
          <span class="text-white font-bold text-xl">A</span>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-white">
          Админ-панель
        </h2>
      </div>

      <!-- Форма -->
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Логин -->
          <div>
            <label for="username" class="sr-only">Логин</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition"
              placeholder="Логин"
              required
            />
          </div>
          <!-- Пароль -->
          <div>
            <label for="password" class="sr-only">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent sm:text-sm transition"
              placeholder="Пароль"
              required
            />
          </div>
        </div>

        <!-- Ошибка -->
        <div v-if="error" class="text-accent text-sm text-center bg-red-50 border border-red-200 rounded-lg p-3">
          {{ error }}
        </div>

        <!-- Кнопка входа -->
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-accent hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition"
          >
            Войти
          </button>
        </div>
      </form>

      
    </div>
  </div>
</template>

<script setup>
// Импортируем axios
import axios from 'axios'

// Реактивные переменные
const form = ref({
  username: '',
  password: ''
})

const error = ref('')

// Функция входа
const login = async () => {
  error.value = '' // сброс ошибки

  try {
    // Отправляем POST-запрос через axios
    const response = await axios.post('/api/login', form.value)

    // Если успех
    if (response.data.success) {
      localStorage.setItem('auth', form.value.username)
      navigateTo('/admin')
    } else {
      error.value = response.data.error
    }
  } catch (err) {
    // Обработка ошибок
    if (err.response) {
      // Сервер вернул ошибку (400, 500 и т.д.)
      error.value = err.response.data.error || 'Ошибка авторизации'
    } else if (err.request) {
      // Нет ответа от сервера (сеть, сервер не запущен)
      error.value = 'Нет соединения с сервером'
    } else {
      // Другая ошибка
      error.value = 'Произошла ошибка'
    }
  }
}
</script>