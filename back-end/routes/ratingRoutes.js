import { Router } from "express";
import { avgRating, addReview, deleteReview } from "../models/ratingModel";
import { updateRating } from "../models/userModel";

const router = Router()

router.post("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await addReview(rating)
        const id = review.ratedUser._id
        const update = await avgRating(id)
        await updateRating(id, update)

    } catch (err) {
        console.error(err)
        res.status(500).send(error);
    }
})

router.delete("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await deleteReview(rating)
        const id = review.ratedUser._id
        const update = await avgRating(id)
        await updateRating(id, update)

    } catch (err) {
        console.error(err)
        res.status(500).send(error);
    }
})