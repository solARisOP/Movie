import { listModel } from "../models/listModels.js"
import { userModel } from "../models/userModels.js"
import { movieModel } from "../models/movieModels.js"
import axios from "axios"

const createList = async(req, res)=>{
    const {name} = req.body
    const user_id = req.user.id
    const newlist = await listModel.create({name, user_id});
    await userModel.findByIdAndUpdate(user_id, { $push: { list_id : newlist._id } }, { new: true });
    res.json({message : `${newlist.name} list created sucessfully`})
}

const getAllLists = async (req, res) =>{
    const user_id = req.user.id
    const user = await userModel.findById(user_id);
    var all_lists = []
    user.list_id.forEach(id => {
        all_lists.push(listModel.findById(id))
    });
    all_lists = await Promise.all(all_lists);
    console.log('hiyef')
    return res.render( 'userHome',{all_lists})
}

const getList = async (req, res) =>{
    const user_id = req.user.id
    const list_id = req.params.id
    const user_list = await listModel.findOne({_id : list_id, user_id}); 
    return res.json(user_list)
}

const updateList = async (req, res) =>{
    const { remove, movie_id, list_id } = req.body;
    const user_id = req.user.id;
    const list = await listModel.findById(list_id);
    if(!list)
    {
        res.status(404)
        throw new Error("list you are searching for does not exists");
    }
    var movie = await movieModel.findOne({id : movie_id})
    if(!remove && !movie)
    {
        const {data} = await axios.get(`https://www.omdbapi.com/?i=${movie_id}&apikey=${process.env.API_OMDB}`)
        const {Title:title, Released:date, Rated:rated, Runtime:runtime, imdbRating:rating, imdbID:id, Type:category,
             Genre:genre, Director:director, Writer:writer, Actors:actors, Plot:plot, Poster:poster, BoxOffice:boxOffice} = data
        movie = await movieModel.create({title, date, rated, runtime, rating, id, category, genre, director, writer, actors, plot, poster, boxOffice});
    }
    var ops = [];
    if(remove && movie.list_id.includes(list_id))
    {
        ops.push(listModel.findOneAndUpdate({user_id, _id : list_id}, { $pull: { movie_id } }, { new: true }));
        ops.push(movieModel.findOneAndUpdate({id : movie_id}, { $pull: { list_id } }, { new: true }));
    } 
    else if(!remove && !movie.list_id.includes(list_id))
    {
        ops.push(listModel.findOneAndUpdate({user_id, _id : list_id}, { $push: { movie_id } }, { new: true }));
        ops.push(movieModel.findOneAndUpdate({id : movie_id}, { $push: { list_id } }, { new: true }));
    }
    await Promise.all(ops)
    return res.json({message : "successfully updated your list"})
}

const deleteList = async (req, res) =>{
    const user_id = req.user.id
    const {list_id} = req.body

    var ops = [];
    const listdel = await listModel.findOneAndDelete({_id : list_id, user_id}); 
    listdel.movie_id.forEach(id => {
        ops.push(movieModel.findOneAndUpdate({id}, { $pull: { list_id } }, { new: true }));
    });
    ops.push(userModel.findByIdAndUpdate(user_id, { $pull: { list_id } }, { new: true }));
    await Promise.all(ops);

    res.json({message : "list deleted successfully"})
}

export {createList, getAllLists, getList, updateList, deleteList}

