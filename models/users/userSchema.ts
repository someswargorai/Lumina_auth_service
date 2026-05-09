import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    country: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    state: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    bio: {
        type: String,
        required: false,
        trim: true,
        lowercase: true
    },
    interests: {
        type: [String],
        required: false,
        trim: true,
        lowercase: true
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("User", schema);