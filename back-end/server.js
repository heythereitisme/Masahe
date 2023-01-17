// server api calls
import express from "express";
import userRouter from "./routes/userRoutes.js"
import ratingRouter from "./routes/ratingRoutes.js"
import eventsRouter from "./routes/eventRoutes.js"

const PORT = 4000;
const app = express();

app.use(express.json());

app.listen(`${PORT}`, () => {
	console.log(`Web server running on port ${PORT}`);
});

app.use("/api/user", userRouter)
app.use("/api/rating", ratingRouter)
app.use("/api/event", eventsRouter)