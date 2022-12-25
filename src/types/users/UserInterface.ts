/**
 * @description interfaces for user
 */
import { Types } from 'mongoose';


interface User {
    _id: Types.ObjectId;
    phone?: string;
    email: string;
    password?: string;
    gender: Gender;

}

enum Gender {
    MALE,
    FEMALE
}