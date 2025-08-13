import dbConnect from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    // Подключаемся к БД
    await dbConnect()
    console.log('✅ Подключено к MongoDB')

    // Читаем тело запроса (данные от клиента)
    const body = await readBody(event)

    // Проверяем обязательные поля
    if (!body.username || !body.password) {
      return {
        error: 'Требуются поля: username и password'
      }
    }

    // Проверяем, существует ли уже такой пользователь
    const existingUser = await User.findOne({ username: body.username })
    if (existingUser) {
      return {
        error: 'Пользователь с таким логином уже существует'
      }
    }

    // Создаём нового пользователя
    const newUser = await User.create({
      username: body.username,
      password: body.password,  // Позже заменим на хэш
      role: body.role || 'user' // если роль не указана — по умолчанию 'user'
    })

    console.log('🎉 Пользователь успешно создан:', newUser.username)
    return {
      message: 'Пользователь успешно создан',
      user: {
        _id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    }
  } catch (error) {
    console.error('❌ Ошибка при создании пользователя:', error.message)
    return {
      error: error.message
    }
  }
})