import mongoose from 'mongoose'
import { type ITeam } from './type'

const Schema = mongoose.Schema

const TeamSchema = new Schema({
  teamId: {
    type: Number,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  /*
  * To prevent repeated stats getting tracked
  * */
  latestGameId: {
    type: Number
  }
})

export const Team = mongoose.model<ITeam>('team', TeamSchema)
