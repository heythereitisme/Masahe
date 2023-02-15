import { Router } from "express";
import { avgRating, addReview, deleteReview, updateReview, getNotes, updateNotes, getPastRated } from "../models/ratingModel.js";
import { getUserByUserName, updateRating } from "../models/userModel.js";

const router = Router()

router.post("/", async(req,res) => {
    const rating = req.body
    try{
        if(rating.rating){
            const review = await addReview(rating)
            const id = review.ratedUser
            const update = await avgRating(id)
            const final = await updateRating(id, update)
            res.send({message: final})
        } else {
            const user = await getUserByUserName(rating.ratedUser)
            const ratedUser = user._id
            const ratingUser = rating.ratingUser
            const entry = {ratingUser, ratedUser}
            const final = await addReview(entry)
            res.send(final)
        }
        
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
    const id = req.params.id
    try{
        const user = await getUserByUserName(id)
        const uid = user._id
        const body = await getNotes(uid)
        res.send(body)
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

router.get("/:id", async(req, res) => {
    const id = req.params.id
    try{
        const ratings = await getPastRated(id)
        res.send(ratings)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})

export default router