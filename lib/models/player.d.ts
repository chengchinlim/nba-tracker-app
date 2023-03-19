import mongoose from 'mongoose';
export declare const Player: mongoose.Model<{
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
}> & Omit<{
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
} & {
    _id: mongoose.Types.ObjectId;
}, never>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
}>> & Omit<mongoose.FlatRecord<{
    firstName: string;
    lastName: string;
    rapidApiId: number;
    teamId: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>>;
