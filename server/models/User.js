// server/models/User.js

import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
}, { timestamps: true })

export default model('User', UserSchema)