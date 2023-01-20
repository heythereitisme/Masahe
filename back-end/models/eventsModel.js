import mongoose from "../mongoose.js";

const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true},
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: String, required: true},
    isAllDay: Boolean,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }
});

const Event = mongoose.model("Events", eventSchema);

export const getBookingEvents = async(id) => {
    const events = await Event.find({user: id, client:{$exists: false}})
    console.log("Sent client booking options!")
    return events
}

export const getUserEvents = async(id) => {
    const events = await Event.find({user: id})
    console.log("sent users events!")
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
    console.log(event)
    const filter = event.id
    const start = event.start
    const end = event.end
    const update = {start, end}
    const updatedEvent = await Event.findOneAndUpdate({_id: filter}, event)
    console.log(`Updated ${updatedEvent.title}`)
    return updatedEvent
}