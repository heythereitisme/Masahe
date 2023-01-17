import mongoose from "../mongoose.js";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: String, required: true},
    isAllDay: Boolean
});

const Event = mongoose.model("Events", eventSchema);

export const getEvents = async() => {
    const events = await Event.find()
    return events
}

export const addNewEvent = async(event) => {
    const newEvent = await Event.create(event)
    console.log("saved new event");
    return newEvent
}

export const deleteEvent = async(event) => {
    const deletedEvent = await Event.deleteOne(event)
    console.log(`Deleted ${event.title}`);
    return deletedEvent
}

export const updateEvent = async(event) => {
    const filter = event.id
    const start = event.start
    const end = event.end
    const update = {start, end}
    const updatedEvent = await Event.findOneAndUpdate({_id: filter}, update)
    console.log(`Updated ${updatedEvent.title}`)
    return updatedEvent
}