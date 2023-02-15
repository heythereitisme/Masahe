import mongoose from "../mongoose.js";

const ratingSchema = new mongoose.Schema({
    ratingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    ratedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true
    },
    rating: {
      type: Number,
    },
    notes: String
  });

ratingSchema.index({ratingUser: 1, ratedUser: 1}, {unique: true})

const Rating = mongoose.model('Ratings', ratingSchema);

export const avgRating = async(id) => {
    const avg = await aggregateRating(id)
    console.log("average:", avg[0].avgRating)
    return avg[0].avgRating
}

const aggregateRating = async(id) => {
    return Rating.aggregate([
        {
            $match: {ratedUser: id }
        },
        {
            $group: {
            _id: null,
            avgRating: {$avg: '$rating'}
        }},
    ]).exec();
}

export const addReview = async(r) => {
    try{
        const review = await Rating.create(r)
        console.log("Rating added!")
        return review
    } catch {
        return await updateReview(r)
    }
}


export const deleteReview = async(r) => {
    const review = await Rating.deleteOne(r)
    console.log("Rating deleted!")
    return review
}

export const updateReview = async(r) => {
    const ratedUser = r.ratedUser
    const ratingUser = r.ratingUser
    const review = await Rating.findOneAndUpdate({ratedUser, ratingUser}, r)
    console.log("Updated Review!")
    return review
}

export const getNotes = async(r) => {
    const notes = await Rating.findOne({ratedUser: r})
    .populate({path: "ratedUser", select: "_id avgRating firstName lastName permission username quadrant licesnsed phoneNumber open avatar"})
    console.log("Sent details!")
    return notes
}

export const updateNotes = async(r) => {
    const id = r._id
    const content = r.notes
    const notes = await Rating.findOneAndUpdate({_id: id}, {notes: content})
    console.log("Updated Notes!")
    return notes
}

export const getPastRated = async(id) => {
    const ratings = await Rating.find({ratingUser: id})
    .populate({path: "ratedUser", select: "_id avgRating firstName lastName permission username licensed open avatar licensed phoneNumber quadrant"})
    console.log("found past ratings")
    return ratings
}