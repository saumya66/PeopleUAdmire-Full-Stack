import * as api from "../api/people.js";

export const signIn = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signIn(formData);
		dispatch({ type: "AUTH", payload: data });
		history.push("/");
	} catch (error) {}
};
export const signUp = (formData, history) => async (dispatch) => {
	try {
		const { data } = await api.signUp(formData);
		dispatch({ type: "AUTH", payload: data });
		history.push("/");
	} catch (error) {}
};
