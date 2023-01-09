import mongoose from "../mongoose.js";

const ratingSchema = new mongoose.Schema({
    ratingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User1',
      required: true
    },
    ratedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User2',
      required: true
    },
    rating: {
      type: Number,
      required: true,
    },
    comments: String
  });

ratingSchema.index({ratingUser: 1, ratedUser: 1}, {unique: true})

const Rating = mongoose.model('Ratings', ratingSchema);

export const avgRating = async(id) => {
    console.log(id)
    const avg = await aggregateRating(id)
    console.log("average:", avg)
    return avg
}

const aggregateRating = (id) => {
    Rating.aggregate([
        {
            $match: {ratedUser: id }
        },
        {
            $group: {
            _id: null,
            avgRating: {$avg: '$rating'}
        }},
    ]).exec((error, result) => {
        if (error) {
            console.error(error)
        } else {
            console.log("order test", result[0].avgRating)
            return result[0].avgRating
        }
    });
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
    .exec(function (err, results) {
        if(!err) {
            console.log("results", results)
            return results
        } else {
            console.log(err)
            return
        }
    })
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