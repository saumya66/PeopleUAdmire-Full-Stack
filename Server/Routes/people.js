import express from "express";

import { getPeople, postPerson, likePerson } from "../Controllers/people.js";
import auth from "../Middleware/auth.js";
const router = express.Router();

router.get("/", getPeople);
router.post("/", auth, postPerson);
router.patch("/:id/likeperson", auth, likePerson);

export default router;
