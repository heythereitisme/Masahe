import mongoose from "../mongoose.js";

const userSchema = new mongoose.Schema({
    fisrtName: {type: String, required: true},
    lastName: {type: String, required: true},
    permission: {type: Number, required: true},
    ratings: {
        type: mongoose.Schema.objectId,
        ref: rating,
        },
    avgRating: {type: Number}
})

const User = mongoose.model("Users", userSchema,)

export const getAllUsers = async() => {
    const users = User.find()
    console.log("All users sent")
    return users
}

export const getAllClients = async() => {
    const users = User.find({permission: 1})
    console.log("Clients sent")
    return users
}

export const getAllSPs = async() => {
    const users = User.find({permission: 2})
    console.log("SP Users sent")
    return users
}

export const addUser = async(u) => {
    const user = User.create(u)
    console.log(user.fisrtName, "added")
    return user
}

export const updateRating = async(u, r) => {
    const uid = u
    User.findOneAndUpdate({_id: u},
        {avgRating: r}
        )
    console.log("updated rating")
}