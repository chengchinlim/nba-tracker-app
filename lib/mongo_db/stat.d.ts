import mongoose from 'mongoose';
export declare const Stat: mongoose.Model<{
    playerId: number;
    teamId: number;
    points: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    playerId: number;
    teamId: number;
    points: number;
}> & Omit<{
    playerId: number;
    teamId: number;
    points: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    playerId: number;
    teamId: number;
    points: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    playerId: number;
    teamId: number;
    points: number;
}>> & Omit<mongoose.FlatRecord<{
    playerId: number;
    teamId: number;
    points: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;