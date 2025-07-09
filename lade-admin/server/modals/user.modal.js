import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String
        },
        last_name: {
            type: String
        },
        account_img: {
            type: String
        },
        password: {
            type: String
        }
    },
    { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
