import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.schema";
import { Books } from "./books.schema";
import { Schema as MongooseSchema } from 'mongoose';


export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
    // @Prop()
    // displayName : string

    @Prop()
    email : string

    @Prop()
    password : string


    @Prop({ type:[{type: MongooseSchema.Types.ObjectId, ref: 'Books'}]})
    books: MongooseSchema.Types.ObjectId | Books[]

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    followers: User[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
    following: User[];


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile'})
    profile: MongooseSchema.Types.ObjectId | Profile

    @Prop({ default: Date.now }) 
    createdAt: Date;

    // @OneToMany(() => Books, story => story.author_id)
    // story: Books;

  
}

export const UserSchema = SchemaFactory.createForClass(User)