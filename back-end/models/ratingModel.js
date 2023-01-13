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
      required: true,
    },
    notes: String
  });

ratingSchema.index({ratingUser: 1, ratedUser: 1}, {unique: true})

const Rating = mongoose.model('Ratings', ratingSchema);

export const avgRating = async(id) => {
    console.log(id)
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
    const review = await Rating.create(r)
    console.log("Rating added!")
    // await populateReview(r._id)
    return review
}

const populateReview = async(id) => {
    Rating.findOne({_id: id})
    .populate("ratingUser")
    .populate("ratedUser")
    .exec()
}

export const deleteReview = async(r) => {
    const review = await Rating.deleteOne(r)
    console.log("Rating deleted!")
    return review
}

export const updateReview = async(r) => {
    const id = r._id
    const review = await Rating.updateOne({_id: id}, {r})
    console.log("Updated Review!")
    return review
}

export const getNotes = async(r) => {
    const id = r
    console.log(r)
    const notes = await Rating.findOne({ratedUser: r})
    .populate("ratedUser")
    console.log(notes)
    return notes
}

export const updateNotes = async(r) => {
    const id = r._id
    const content = r.notes
    const notes = await Rating.updateOne({_id: id}, {notes: content})
    console.log("Updated Notes!")
    return {message: "Updated Notes!"}
}