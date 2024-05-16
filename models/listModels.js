import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: 'User'
    },
    movie_id: [{
        type: String,
        ref: 'Movie'
    }],
    name: {
        type: String,
        trim : true,
        maxlength : [100, "name length is exceeding 100 characters"],
        require: [true, "list name is mandatory"],
    },
    description: String,
    created_at: { 
        type: Date,
        required: true, 
        default: Date.now 
    }
});

listSchema.index({ name: 1, user_id: 1 }, { unique: true });

listSchema.path('name').validate(value=>{
    return /^(?=.*[a-zA-Z\d])[a-zA-Z\d\s]+$/.test(value)
}, "name can only contain uppercase, lowercase or digit")

const listModel = mongoose.model('List', listSchema);

export { listModel }