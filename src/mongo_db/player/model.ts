import mongoose from 'mongoose'
import { type IPlayer } from './type'
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  playerId: {
    type: Number,
    required: true
  },
  personId: {
    type: Number,
    required: true
  },
  teamId: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

export const Player = mongoose.model<IPlayer>('player', PlayerSchema)
