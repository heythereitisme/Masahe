import { Router } from "express";
import {
  addNewEvent,
  deleteEvent,
  getEvents,
  updateEvent,
  getUserEvents
} from "../models/eventsModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    console.log(id)
    const events = await getUserEvents(id);
    res.send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const event = req.body;
    const newEvent = await addNewEvent(event);
    res.send(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.patch("/", async (req, res) => {
  try {
    const event = req.body;
    const updatedEvent = await updateEvent(event);
    res.send(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const event = req.body;
    const deletedEvent = await deleteEvent(event);
    res.send(deletedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

export default router;
