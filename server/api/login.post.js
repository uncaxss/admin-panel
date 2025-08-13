// Подключаемся к БД и модель User
import dbConnect from '../utils/db.js'
import User from '../models/User.js'

// Главная функция, которая будет вызвана при запросе
export default defineEventHandler(async (event) => {
  try {
    // 1. Подключаемся к MongoDB
    await dbConnect()

    // 2. Читаем тело запроса (логин и пароль от пользователя)
    const body = await readBody(event)
    console.log(body);
    
    // 3. Извлекаем логин и пароль
    const { username, password } = body

    // 4. Ищем пользователя в БД по логину
    const user = await User.findOne({ username })

    // 5. Если пользователь не найден — ошибка
    if (!user) {
      return { error: 'Пользователь не найден' }
    }

    // 6. Если пароль не совпадает — ошибка
    if (user.password !== password) {
      return { error: 'Неверный пароль' }
    }

    // 7. Всё ок — возвращаем пользователя (без пароля в ответе)
    return {
      success: true,
      user: {
        username: user.username,
        role: user.role,
        _id: user._id
      }
    }

  } catch (error) {
    // 8. Если произошла ошибка (например, БД недоступна)
    return { error: error.message }
  }
})