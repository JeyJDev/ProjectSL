import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    lastname:{
        type: String,
        required: true,
        trim: true,
    },
    age:{
        type: Number,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    team:{
        type: String,
    },
    profilePicture: {
        type: String,
    },
}, {
    timestamps: true
})

export default mongoose.model('Player', playerSchema)

