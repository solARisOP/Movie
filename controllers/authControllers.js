import { userModel } from "../models/userModels.js"
import bcrypt from "bcrypt"
import JsonWebToken from "jsonwebtoken"

const authView = (req, res)=>{
    res.render('auth')
}

const userLogin = async (req, res)=>{
    let { username, password } = req.body
    if(!username || !password)
    {
        res.status(400)
        throw new Error("All fields are required")
    }
    const user = await userModel.findOne({username})

    if(!user || !(await bcrypt.compare(password, user.password)))
    {
        res.status(400)
        throw new Error("username and password doesnot match")
    }
    
    const token = JsonWebToken.sign({username : user.username, id : user._id}, process.env.jwt_secret, {expiresIn:'30d'});
    res.json({message : 1, token});
}

const userSignup = async (req, res)=>{
    var { username, password } = req.body
    if(!username || !password)
    {
        res.status(400)
        throw new Error("All fields are required")
    }  
    const user = await userModel.create({username, password})

    res.json({message : "user created successfully"});
}

export {userLogin, userSignup, authView};