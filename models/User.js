import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
});

const User = new mongoose.model('user', UserSchema);
export default User;