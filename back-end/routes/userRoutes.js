import { Router } from "express";
import { getAllUsers, getAllClients, getAllSPs, addUser, deleteUser, updateUser } from "../models/userModel.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send(users);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
})

router.get("/client", async (req, res) => {
    try {
        const clients = await getAllClients();
        res.send(clients);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
})

router.get("/sp", async (req, res) => {
    try {
        const sps = await getAllSPs();
        res.send(sps);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
})

router.post("/", async (req, res) => {
    const newUser = req.body
    try {
        const createUser = await addUser(newUser);
        res.send(createUser)
    } catch (error) {
        console.error(error)
        res.status(500).send(error)
    }
})

router.delete("/", async(req, res) => {
  const user = req.body
  try {
    const deletedUser = await deleteUser(user)
    res.send(deletedUser)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
}
})

router.put("/", async(req,res) => {
   const user = req.body
   const username = user.username
   console.log(user)
  try {
    const deletedUser = await updateUser(username, user)
    res.send(deletedUser)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
}
})

export default router