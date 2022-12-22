import { Router } from "express";
import { getAllUsers, getAllClients, getAllSPs, addUser } from "../models/userModel.js";

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

export default router