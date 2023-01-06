import mongoose from "../mongoose.js";

const ratingSchema = new mongoose.Schema({
    ratingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    ratedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comments: String
  });

ratingSchema.index({ratingUser: 1, ratedUser: 1}, {unique: true})

const Rating = mongoose.model('Rating', ratingSchema);

export const avgRating = async(u) => {
    Rating.aggregate([
        {
            $match: {ratedUser: u }
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
            return result
        }
    });
}

export const addReview = async(r) => {
    const review = Rating.create(r)
    console.log("Rating added!")
    return review
}

export const deleteReview = async(r) => {
    const review = Rating.deleteOne(r)
    console.log("Rating deleted!")
    return review
}