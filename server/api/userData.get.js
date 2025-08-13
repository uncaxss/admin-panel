// Подключаемся к БД и модель User
import dbConnect from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    // Подключаемся к БД
    await dbConnect()

    // Читаем заголовок Authorization (если есть)
    const auth = event.node.req.headers.authorization

    // Если нет авторизации — ошибка
    if (!auth) {
      return { error: 'Не авторизован' }
    }

    // Допустим, мы храним в localStorage токен = username
    const username = auth.replace('Bearer ', '')

    // Ищем пользователя по username
    const user = await User.findOne({ username })

    if (!user) {
      return { error: 'Пользователь не найден' }
    }

    // Возвращаем только нужные поля
    return {
      _id: user._id,
      username: user.username,
      role: user.role
    }
  } catch (error) {
    return { error: error.message }
  }
})