import mongoose from "mongoose";

const schema = mongoose.Schema({
	name: String,
	inspire: String,
	creatorName: String,
	file: String,
	link: String,
	likes: {
		type: [String],
		default: [],
	},
	postDate: {
		type: Date,
		default: new Date(),
	},
});
var PersonModel = mongoose.model("PersonSchema", schema);
export default PersonModel;
