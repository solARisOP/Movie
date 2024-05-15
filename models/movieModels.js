import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id : String,
    title : String,
    date : String,
    rated : String,
    rating : String,
    runtime : String,
    genre : String,
    director : String,
    writer : String,
    actors : String,
    plot : String,
    boxOffice : String,
    category: String,
    poster : String,
    list_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
});

const movieModel = mongoose.model('Movie', movieSchema);

export { movieModel }