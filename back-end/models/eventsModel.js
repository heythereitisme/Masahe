import mongoose from "../mongoose.js";

const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    start: {type: Date, required: true},
    end: {type: String, required: true},
    isAllDay: Boolean,
    resources: {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true},
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
    }
});

const Event = mongoose.model("Events", eventSchema);

export const getBookingEvents = async(id) => {
    const events = await Event.find({'resources.user': id, 'resources.client': {$exists: false}})
    console.log("Sent client booking options!")
    return events
}

export const getUserEvents = async(id) => {
    const events = await Event.find({'resources.user': id})
    .populate('resources.client')
    console.log("sent users events!")
    return events
}

export const addNewEvent = async(event) => {
    const newEvent = await Event.create(event)
    console.log("saved new event");
    return newEvent
}

export const deleteEvent = async(event) => {
    const id = event._id
    const deletedEvent = await Event.findByIdAndDelete(id)
    console.log(`Deleted ${event.title}`);
    return deletedEvent
}

export const updateEvent = async(event) => {
    const filter = event.id
    const updatedEvent = await Event.findOneAndUpdate({_id: filter}, event)
    console.log(`Updated ${updatedEvent.title}`)
    return updatedEvent
}