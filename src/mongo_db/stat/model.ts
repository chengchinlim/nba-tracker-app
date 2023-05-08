import mongoose from 'mongoose'
import { type IStats } from './type'

const Schema = mongoose.Schema

const StatSchema = new Schema({
  gameId: {
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

export const Stat = mongoose.model<IStats>('stat', StatSchema)
