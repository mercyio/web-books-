import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';
import { Books } from "./books.schema";


export type ProfileDocument = HydratedDocument<Profile>;
@Schema()
export class Profile{ 
    @Prop()
    username : string

    @Prop()
    fullname : string

    @Prop()
    age : string

    @Prop()
    location : string

    @Prop()
    contact : string
    
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    userId: MongooseSchema.Types.ObjectId | User

    @Prop({ default: Date.now }) 
    createdAt: Date;
   
    // @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Books' }] })
    // books:  Books[];
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)