import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import peopleRoutes from "./Routes/people.js";
import userRoutes from "./Routes/users.js";
import dotenv from "dotenv";
const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

app.use("/people", peopleRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	res.send("Hello I m the server on Heroku");
});

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
	)
	.catch((error) => console.log(`${error} did not connect `));

mongoose.set("useFindAndModify", false);
