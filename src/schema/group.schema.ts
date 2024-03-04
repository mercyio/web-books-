import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument  } from "mongoose";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';


export type Document = HydratedDocument<Group>;
@Schema()
export class Group{
    @Prop()
    groupName : string

    @Prop()
    discription : string

    @Prop()
    bookId : string

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    members: User[];



}

export const GroupSchema = SchemaFactory.createForClass(Group)