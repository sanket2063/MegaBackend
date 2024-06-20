import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'

const registerUser = asyncHandler(async(req,res)=>{
    const {fullName,email,password,username} = req.body

    if (
        [fullName,username,password,email].some((field)=>field?.trim()==="")
    ) {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or:[{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409,"User with email or username already exists")
    }
})

export {registerUser}