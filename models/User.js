import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 50, unique: true, required: true },
    password_hash: { type: String, maxlength: 50, required: true },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);
export default User;