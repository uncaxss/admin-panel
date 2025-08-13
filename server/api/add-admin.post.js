import dbConnect from '../utils/db.js'
import User from '../models/User.js'

export default defineEventHandler(async (event) => {
  try {
    // Подключаемся к БД
    await dbConnect()
    console.log('✅ Подключено к MongoDB')

    // Проверяем, есть ли уже админ
    const existingAdmin = await User.findOne({ username: 'admin' })

    if (existingAdmin) {
      console.log('🟢 Админ уже существует:', existingAdmin.username)
      return {
        message: 'Админ уже существует',
        user: existingAdmin
      }
    }

    // Создаём нового админа
    const newAdmin = await User.create({
      username: 'admin',
      password: '12345', // Позже заменим на хэш
      role: 'admin'
    })

    console.log('🎉 Админ успешно создан:', newAdmin.username)
    return {
      message: 'Админ успешно создан',
      user: newAdmin
    }
  } catch (error) {
    console.error('❌ Ошибка при создании админа:', error.message)
    return {
      error: error.message
    }
  }
})