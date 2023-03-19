import mongoose from 'mongoose';
export declare const Stat: mongoose.Model<{
    teamId: number;
    playerId: number;
    points: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    teamId: number;
    playerId: number;
    points: number;
}> & Omit<{
    teamId: number;
    playerId: number;
    points: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    teamId: number;
    playerId: number;
    points: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    teamId: number;
    playerId: number;
    points: number;
}>> & Omit<mongoose.FlatRecord<{
    teamId: number;
    playerId: number;
    points: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
