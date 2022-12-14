import mongoose from "../mongoose.js";

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    permission: {type: Number, required: true, default: 1},
    ratings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        },
    avgRating: {type: Number, default: 0}
})

const User = mongoose.model("Users", userSchema,)

export const getAllUsers = async() => {
    const users = await User.find()
    console.log("All users sent")
    return users
}

export const getAllClients = async() => {
    const users = await User.find({permission: 1})
    console.log("Clients sent")
    return users
}

export const getAllSPs = async() => {
    const users = await User.find({permission: 2})
    console.log("SP Users sent")
    return users
}

export const addUser = async(u) => {
    console.log("U =", u)
    const user = await User.create(u)
    console.log(user.firstName, "added")
    return user
}

export const updateRating = async(u, r) => {
    const uid = u
    await User.findOneAndUpdate({_id: u},
        {avgRating: r}
        )
    // console.log("updated rating")
}

export const deleteUser = async(u) => {
    const removedUser = await User.deleteOne(u)
    console.log("removed user!")
    return removedUser
}