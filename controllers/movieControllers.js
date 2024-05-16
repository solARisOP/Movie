import axios from "axios"

const getMovies = async (req, res) => {
    var {movie_name, movie_id, year, type} = req.body
    if(!movie_name && !movie_id)
    {
        res.status(400)
        throw new Error('one of name or id of content is compulsory')
    }
    if(type === undefined) type = "movie"

    if(movie_id !== "")
    {
        let {data} = await axios.get(`https://www.omdbapi.com/?i=${movie_id}&apikey=${process.env.API_OMDB}`)
        if(data.Response == "False")
        {
            res.status(404)
            throw new Error("wrong id")
        }
        const movies = [data]
        res.render('moviesView', {movies});
    } 
    var data2 = await axios.get(`https://www.omdbapi.com/?s=${movie_name}&y=${year}&type=${type}&apikey=${process.env.API_OMDB}`)
    let{data} = data2
    if(data.Response === "False")
    {
        res.status(404)
        throw new Error('No match')
    }
    const {Search:chunk} = data
    const movies = chunk.slice(0, 10);

    res.render('moviesView', {movies});
}

export {getMovies}