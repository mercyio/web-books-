import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.schema";
import { Books } from "./books.schema";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
    @Prop()
    displayName : string

    @Prop()
    email : string

    @Prop()
    password : string

    @Prop({ default: Date.now }) 
    createdAt: Date;

    @OneToOne(() => Profile, profile => profile.user)
    profile: Profile;

    @OneToMany(() => Books, story => story.author)
    story: Books;

  
}

export const UserSchema = SchemaFactory.createForClass(User)