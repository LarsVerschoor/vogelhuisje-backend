import mongoose from 'mongoose';

const CameraSchema = new mongoose.Schema({
    camera_id: { type: Number, unique: true, required: true },
    stream_url: { type: String },
    camera_enabled: { type: Boolean, default: true },
    notes_enabled: { type: Boolean, default: false }
});

const Camera = mongoose.model('camera', CameraSchema);
export default Camera;
