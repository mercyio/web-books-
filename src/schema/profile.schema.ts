import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.schema";
import { Schema as MongooseSchema } from 'mongoose';


export type ProfileDocument = HydratedDocument<Profile>;
@Schema()
export class Profile{
    @Prop()
    id : string
    
    @Prop()
    firstname : string

    @Prop()
    lastname : string

    @Prop()
    age : string

    @Prop()
    contact : string

    @Prop({ default: Date.now }) 
    createdAt: Date;
    
    // @OneToOne(() => User, user => user.profile)
    // @JoinColumn({name: 'user_id'})
    // user: User;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user: MongooseSchema.Types.ObjectId | User
   
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)