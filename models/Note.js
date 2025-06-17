import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    note_id: { type: Number, unique: true, required: true },
    rental_id: { type: Number, required: true, ref: 'rental' },
    content: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Note = mongoose.model('note', NoteSchema);
export default Note;
