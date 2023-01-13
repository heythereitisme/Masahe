import { Router } from "express";
import { avgRating, addReview, deleteReview, updateReview } from "../models/ratingModel.js";
import { updateRating } from "../models/userModel.js";

const router = Router()

router.post("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await addReview(rating)
        const id = review.ratedUser
        const update = await avgRating(id)
        console.log("update", update)
        const final = await updateRating(id, update)
        console.log("final", final)
        res.send({message: final})
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
})

router.delete("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await deleteReview(rating)
        const id = review.ratedUser._id
        const update = await avgRating(id)
        const final = await updateRating(id, update)
        res.send(final)
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
})

router.put("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await updateReview(rating)
        const id = review.ratedUser._id
        const update = await avgRating(id)
        const final = await updateRating(id, update)
        res.send(final)
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
})

export default router