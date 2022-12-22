// server api calls
import express from "express";
import userRouter from "./routes/userRoutes.js"

const PORT = 4000;
const app = express();

app.use(express.json());

app.listen(`${PORT}`, () => {
	console.log(`Web server running on port ${PORT}`);
});

app.use("/api/user", userRouter)