import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req,res)=>{
    
    const {username, email, password} = req.body
    // Check if user exist
    const q = "SELECT * FROM users WHERE email=? OR username=?";
    db.query(q, [email, username], (err, data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json('User already exist')
        
        // bycrpt 
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
        const values =[
            username,
            email,
            hash
        ]
        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json('User created successfully')
        })
    })

}

export const login = (req,res)=>{
    const {username, password: userPassword} = req.body
    const q = "SELECT * FROM users WHERE username=?";

    db.query(q,[username],(err,data)=>{
        if(err) return res.json(err);
        if(data.length == 0) return res.status(404).json('User not found!!!')
        
        // Checking password
        const isPasswordCorrect = bcrypt.compareSync(userPassword, data[0].password);
        if(!isPasswordCorrect) return res.status(400).json("username or password not correct");

        const token = jwt.sign({id: data[0].id}, 'jwtkey');
        const {password, ...other} = data[0]

        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json(other)

    })
}

export const logout = (req,res)=>{
    
}