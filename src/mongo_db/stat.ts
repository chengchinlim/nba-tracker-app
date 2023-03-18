import mongoose from 'mongoose'
const Schema = mongoose.Schema

const StatSchema = new Schema({
  teamId: {
    type: Number,
    required: true
  },
  playerId: {
    type: Number,
    required: true
  },
  points: {
    type: Number,
    required: true
  }
})

export const Stat = mongoose.model('stat', StatSchema)
