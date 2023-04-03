import mongoose from 'mongoose';
export declare const Player: mongoose.Model<{
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
}> & Omit<{
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
}>> & Omit<mongoose.FlatRecord<{
    playerId: number;
    personId: number;
    teamId: number;
    firstName: string;
    lastName: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
