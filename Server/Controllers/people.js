import express from "express";
import mongoose from "mongoose";
import PersonModel from "../Models/personModel.js";

export const getPeople = async (req, res) => {
	try {
		const peopleData = await PersonModel.find();
		res.status(200).json(peopleData);
	} catch (error) {
		res.status(404).json({ message: error });
	}
};

export const postPerson = async (req, res) => {
	const post = req.body;

	const newpostPerson = new PersonModel({
		...post,
		creatorName: req.userId,
	});
	try {
		await newpostPerson.save();
		res.status(200).json(newpostPerson);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const likePerson = async (req, res) => {
	try {
		const { id } = req.params;
		if (!req.userId) res.send("User not aunthenticated");

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No person with that ${id}`);
		const person = await PersonModel.findById(id);
		const index = person.likes.findIndex((id) => id === String(req.userId));
		if (index == -1) {
			//like post
			person.likes.push(String(req.userId));
		} else {
			//not like
			person.likes = person.likes.filter((id) => id !== String(req.userId));
		}

		const updatedPerson = await PersonModel.findByIdAndUpdate(id, likes, {
			new: true,
		});
		res.json(updatedPerson);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};
