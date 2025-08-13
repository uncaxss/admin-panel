<template>
    <AdminLayout>
        <template #default>
            <div class="mt-6">
                <button
                    @click="createUser"
                    class="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
                >
                    Создать пользователя
                </button>
            </div>
        </template>
    </AdminLayout>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})

import AdminLayout from "~/components/adminLayout.vue";
import axios from "axios";

// Функция: создать пользователя (пример)
const createUser = async () => {
    if (!confirm("Создать тестового пользователя?")) return;

    try {
        const response = await axios.post("/api/add-user", {
            username: "user",
            password: "new@example.com",
            role: "user",
        });

        if (response.data.user) {
            alert("Пользователь создан!");
            // Обновим список (если будет)
            loadUserData(); // или отдельная функция loadUsers
        } else {
            alert("Ошибка: " + response.data.error);
        }
    } catch (err) {
        const errorMsg = err.response?.data?.error || "Не удалось создать";
        alert("Ошибка: " + errorMsg);
    }
};
</script>
