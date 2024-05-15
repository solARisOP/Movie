import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength : 6,
        maxlength : 15,
        unique: [true, "user with this username already exists"]
    },
    password: {
        type: String,
        required: true
    },
    list_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]

})

userSchema.path('password').validate( value => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(value);
}, 'Incorrect password format')

userSchema.path('username').validate( value => {
    return /^(?=.*[a-z])(?!.*\s)(?![A-Z]).*$/.test(value);
}, 'Incorrect username format')

userSchema.pre('save', async function (next) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
});

export const userModel = mongoose.model("User", userSchema);