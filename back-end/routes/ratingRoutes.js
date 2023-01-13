import { Router } from "express";
import { avgRating, addReview, deleteReview, updateReview, getNotes, updateNotes } from "../models/ratingModel.js";
import { updateRating } from "../models/userModel.js";

const router = Router()

router.post("/", async(req,res) => {
    const rating = req.body
    try{
        const review = await addReview(rating)
        const id = review.ratedUser
        const update = await avgRating(id)
        const final = await updateRating(id, update)
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

router.get("/notes/:id", async(req, res) => {
    const id = req.query
    try{
        const body = await getNotes(id)
        const notes = body.notes
        res.send(notes)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

router.post("/notes", async(req, res) => {
    const user = req.body
    try{
        const body = await updateNotes(user)
        res.send(body)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

export default router