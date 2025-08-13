<!-- components/menuPanel.vue -->
<template>
  <div class="row-span-3 bg-primary-dark text-white p-4">
    <h1 class="text-xl font-bold mb-4">Админ-панель</h1>
    <nav>
      <ul>
        <li class="mb-2">
          <NuxtLink
            to="/admin"
            class="block px-4 py-2 hover:bg-accent transition"
          >
            Статистика
          </NuxtLink>
        </li> 
        <li class="mb-2">
          <NuxtLink
            to="/admin/settings"
            class="block px-4 py-2 hover:bg-accent transition"
          >
            Настройки
          </NuxtLink>
        </li>
        <li v-if="user && user.role === 'admin'" class="mb-2">
          <NuxtLink
            to="/admin/adminSetting"
            class="block px-4 py-2 hover:bg-accent transition italic"
          >
            Настройки Админа
          </NuxtLink>
        </li>
        <li class="mt-4">
          <button @click="logout" class="block px-4 py-2 hover:bg-red-500 transition">
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
const logout = () => {
  localStorage.removeItem('auth')
  navigateTo('/')
}

import axios from "axios";

// Состояние
const loading = ref(true);
const error = ref("");
const user = ref(null);

// Проверка авторизации и роли
const checkAuth = async () => {
    loading.value = true;
    error.value = "";
    user.value = null;

    try {
        // Получаем username из localStorage
        const username = localStorage.getItem("auth");
        if (!username) {
            // Если не авторизован — редирект на главную
            return navigateTo("/");
        }

        // Отправляем GET-запрос на /api/userData
        // Передаём username в заголовке Authorization
        const response = await axios.get("/api/userData", {
            headers: {
                Authorization: `Bearer ${username}`,
            },
        });

        if (response.data.error) {
            error.value = response.data.error;
        } else {
            user.value = response.data;
        }
    } catch (err) {
        error.value = "Ошибка при загрузке данных";
    } finally {
        loading.value = false;
    }
};

// Вызов при монтировании
onMounted(() => {
    checkAuth();
});

</script>