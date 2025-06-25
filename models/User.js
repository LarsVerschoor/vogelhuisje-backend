import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, maxlength: 50, required: true },
    email: { type: String, maxlength: 50, unique: true, required: true },
<<<<<<< HEAD
    password: { type: String, maxlength: 100, required: true },
    role: { type: String, maxlength: 20 },
=======
    password_hash: { type: String, maxlength: 60, required: true, select: false },
>>>>>>> 489eae762a5a11fdda5a645f572992aab7e75b5d
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('user', UserSchema);
export default User;