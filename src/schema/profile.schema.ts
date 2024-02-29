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
    fullname : string

    @Prop()
    age : string

    @Prop()
    location : string

    @Prop()
    contact : string

    @Prop({ default: Date.now }) 
    createdAt: Date;
    
    // @OneToOne(() => User, user => user.profile)
    // @JoinColumn({name: 'user_id'})
    // user: User;
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User'})
    user_id: MongooseSchema.Types.ObjectId | User
   
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Books' }] })
    books:  Books[];
  
}

export const ProfileSchema = SchemaFactory.createForClass(Profile)