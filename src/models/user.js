import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        lowercase: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [32, "Username must be at most 32 characters long"]
        // unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid"]
        // unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters long"],
        trim: true,
        select: false,
    },
    verify: {
        status: {
            type: Boolean,
            default: false
        },
        token: {
            type: String,
            default: null
        }
    }
}, { timestamps: true }
)

export default mongoose.model("User", userSchema)