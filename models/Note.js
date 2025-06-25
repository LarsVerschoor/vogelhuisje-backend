import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
    birdhouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Birdhouse',
        required: true
    },
    content: { type: String },
    created_at: { type: Date, default: Date.now }
});

const Note = mongoose.model('note', NoteSchema);
export default Note;
