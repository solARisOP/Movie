import axios from "axios"

const getMovies = async (req, res) => {
    const {name} = req.query
    if(!name)
    {
        res.status(400)
        throw new Error('name od the movie is mandatory')
    }

    const {data} = await axios.get(`https://www.omdbapi.com/?s=${name}&apikey=${process.env.API_OMDB}`)
    const {Search:chunk} = data
    const movies = chunk.slice(0, 5);

    res.json({movies});
}

const get_Movie = async (req, res) => {
    const {id} = req.params
    if(!id)
    {
        res.status(400)
        throw new Error('id is required')
    }

    const {data:movie} = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.API_OMDB}`)

    res.json(movie);
}

export {getMovies, get_Movie}