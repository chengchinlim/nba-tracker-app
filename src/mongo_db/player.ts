import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rapidApiId: {
    type: Number,
    required: true
  },
  teamId: {
    type: Number,
    required: true
  }
})

export const Player = mongoose.model('player', PlayerSchema)
