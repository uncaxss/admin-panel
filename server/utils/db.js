// server/utils/db.js

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

// server/utils/db.js
  console.log('🔌 Подключаемся к:', MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error('Укажи MONGODB_URI в .env')
}

// @ts-ignore
let cached = global.mongoose

if (!cached) {
  // @ts-ignore
  global.mongoose = { conn: null, promise: null }
  // @ts-ignore
  cached = global.mongoose
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    // @ts-ignore
    cached.conn = await cached.promise
    cached.promise = null
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn

}

export default dbConnect