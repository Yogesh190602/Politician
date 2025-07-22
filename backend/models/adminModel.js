import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    EmailId: { type: String, required: true },
    Password: { type: String, Required: true },
});

export default mongoose.model('Admin', adminSchema);