import {db} from '../db.js'
import bcrypt from 'bcrypt'

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
    })

}

export const login = (req,res)=>{
    
}

export const logout = (req,res)=>{
    
}