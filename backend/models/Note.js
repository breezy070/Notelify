import mongoose, { mongo } from "mongoose";

const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false
        },
        isFavorite: {
            type: Boolean,
            required: false,
            default: false
        },
        message: {
            type: String,
            required: false,
        },
        tags: {
            type: [String],
            required: false,
            default: [],
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Note", NoteSchema);