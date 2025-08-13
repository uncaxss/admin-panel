import dbConnect from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    await dbConnect()
    console.log('✅ Подключено к MongoDB')

    // Логируем имя модели и коллекции
    console.log('🔍 Модель User использует коллекцию:', User.collection.name)

    const users = await User.find({})
    console.log('📌 Найдено пользователей:', users.length)

    return { users }
  } catch (error) {
    console.error('❌ Ошибка:', error.message)
    return { error: error.message }
  }
})