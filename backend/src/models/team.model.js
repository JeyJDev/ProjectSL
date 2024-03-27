import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
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
    teamName:{
        type: String,
        required: true,
    },
    jugadores:[{
        name:{
            type: String
        },
        lastname:{
            type: String
        },
        age:{
            type: Number
        }
    }],
    solicitudes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Player'
    }],
}, {
    timestamps: true
})

export default mongoose.model('Team', teamSchema)