import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password_hash: { type: String, maxlength: 60, required: true, select: false },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);
export default User;