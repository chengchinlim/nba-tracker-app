import mongoose from 'mongoose'
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
  },
  /*
  * If now - lastUpdated > 24 hours
  * let the update stats cron job run
  * */
  lastUpdated: {
    type: Date
  }
})

export const Team = mongoose.model('team', TeamSchema)
