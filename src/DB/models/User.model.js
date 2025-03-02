

import mongoose, { Schema, Types, model } from "mongoose";
export const gendertypes = { male: "Male", female: "Female" }
export const roletypes = { User: "User", Admin: "Admin" }
export const providerTypes = { system: "system", google: "google" }

const userSchema = new mongoose.Schema(
    {

        
        email: { type: String, unique: true, required: true },
        password: { type: String },
        provider: { type: String, enum: Object.values(providerTypes),default:providerTypes.system },
        gender: { type: String, enum: Object.values(gendertypes), default: gendertypes.male },
        isDeleted: { type:Boolean, default:false},
        firstName: { type: String },
        lastName: { type: String },
        DOB: {
            type: Date,
         
            validate: {
                validator: function (value) {
                    const today = new Date();
                    const minAgeDate = new Date();
                    minAgeDate.setFullYear(today.getFullYear() - 18); 
                    return value < today && value <= minAgeDate;
                },
                message: "Date of Birth must be in the past and age must be greater than 18 years.",
            },
        },
        mobileNumber: { type: String },
        role: { type: String, enum: Object.values(roletypes),  default: roletypes.User },
        isConfirmed: { type: Boolean, default: false },
        deletedAt: { type: Date },
        bannedAt: { type: Date },
        isBanned: { type: Boolean, default: false },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        changecredintialTime: { type: Date },

        profilePic: { secure_url: String, public_id: String },
        coverPic: [{ secure_url: String, public_id: String }],
        uploadedFiles: [{ secure_url: String, public_id: String, format: String }],
      
        emailOTP: String,
        forgetpasswordOTP: String,
        attemptCount: Number,
        otpExpiresAt: Date,
        blockUntil: {
            type: Date,
        },

     
    },
    { timestamps: true }
);


userSchema.virtual("username").set(function (value) {
    this.firstName = value.split(" ")[0]
    this.lastName = value.split(" ")[1]
}).get(function () {
    return this.firstName + " " + this.lastName
})

const Usermodel = mongoose.model("User", userSchema);
export default Usermodel;
export const scketConnections = new Map()
export const onlineUsers = new Map();



